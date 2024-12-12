import React, { useMemo } from "react";
import { ProtoPackage } from "../../../../types";
import { Link, useLocation } from "react-router";
import {
  Flex,
  Group,
  RenderTreeNodePayload as TreeNodeProps,
  Tree,
  NavLink,
  TreeNodeData,
  useTree,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export interface NavBarProps {
  protoPackage: ProtoPackage | undefined;
  onServiceSelected?: () => void;
  hasError?: boolean;
}

const TreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: TreeNodeProps) => {
  const location = useLocation();

  return (
    <Group gap="xs" {...elementProps}>
      <NavLink
        label={node.label}
        component={Link}
        active={[
          location.pathname,
          `${location.pathname}${location.hash}`,
        ].includes(node.nodeProps?.route)}
        to={node.nodeProps?.route}
        rightSection={
          hasChildren && (
            <IconChevronDown
              size={14}
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          )
        }
        onClick={() => {
          if (hasChildren) {
            tree.collapseAllNodes();
          }
          tree.toggleExpanded(node.value);
        }}
        childrenOffset={28}
      />
    </Group>
  );
};

export const NavBar: React.FC<NavBarProps> = ({ protoPackage, hasError }) => {
  const tree = useTree();

  const protoPackageTree = useMemo((): TreeNodeData[] => {
    if (!protoPackage) return [];

    const servicesTree = protoPackage.services.map((service) => ({
      label: service.name,
      value: service.name,
      nodeProps: { route: `/service/${service.name}` },
      children: service.methods.map((method) => ({
        label: method.name,
        value: `${service.name}.${method.name}`,
        nodeProps: { route: `/service/${service.name}#${method.name}` },
      })),
    }));

    return [
      {
        label: <b>Package: {protoPackage.name}</b>,
        value: protoPackage.name,
        nodeProps: { route: "/" },
      },
      ...servicesTree,
    ];
  }, [protoPackage]);

  if (hasError) return <></>;
  if (!protoPackage) return <>Loading...</>;

  return (
    <Flex direction="column" gap="xs">
      <Tree
        tree={tree}
        data={protoPackageTree}
        levelOffset={23}
        expandOnClick={false}
        renderNode={TreeNode}
      />
    </Flex>
  );
};
