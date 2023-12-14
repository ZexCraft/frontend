import Layout from "@/components/Layout";
import React from "react";
// @ts-ignore
import Tree from "react-d3-tree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TreeNodeElement from "@/components/TreeNodeElement";
import useWindowSize from "@/hooks/useWindowSize";
// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "root",
  attributes: {
    relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
    nft1: {
      image: "/sample-nfts/noun.png",
      isChild: false,
      rarity: "Rare",
      tokenId: "45362345",
      mode: "create ✨",

      tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
    },
    nft2: {
      image: "/sample-nfts/noun.png",
      isChild: false,
      rarity: "Rare",
      tokenId: "45362345",
      mode: "create ✨",

      tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
    },
  },
  children: [
    {
      name: "Manager",
      attributes: {
        relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
        nft1: {
          image: "/sample-nfts/noun.png",
          isChild: false,
          rarity: "Rare",
          tokenId: "45362345",
          mode: "create ✨",

          tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
        },
        nft2: {
          image: "/sample-nfts/noun.png",
          isChild: false,
          rarity: "Rare",
          tokenId: "45362345",
          mode: "create ✨",

          tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
        },
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            nft1: {
              image: "/sample-nfts/noun.png",
              isChild: false,
              rarity: "Rare",
              tokenId: "45362345",
              mode: "create ✨",

              tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            },
            nft2: {
              image: "/sample-nfts/noun.png",
              isChild: false,
              rarity: "Rare",
              tokenId: "45362345",
              mode: "create ✨",

              tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            },
          },
          children: [
            {
              name: "Worker",
              attributes: {
                relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                nft1: {
                  image: "/sample-nfts/noun.png",
                  isChild: false,
                  rarity: "Rare",
                  tokenId: "45362345",
                  mode: "create ✨",

                  tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                },
                nft2: {
                  image: "/sample-nfts/noun.png",
                  isChild: false,
                  rarity: "Rare",
                  tokenId: "45362345",
                  mode: "create ✨",

                  tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                },
              },
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            nft1: {
              image: "/sample-nfts/noun.png",
              isChild: false,
              rarity: "Rare",
              tokenId: "45362345",
              mode: "create ✨",

              tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            },
            nft2: {
              image: "/sample-nfts/noun.png",
              isChild: false,
              rarity: "Rare",
              tokenId: "45362345",
              mode: "create ✨",

              tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            },
          },
          children: [
            {
              name: "Worker",
              attributes: {
                relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                nft1: {
                  image: "/sample-nfts/noun.png",
                  isChild: false,
                  rarity: "Rare",
                  tokenId: "45362345",
                  mode: "create ✨",

                  tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                },
                nft2: {
                  image: "/sample-nfts/noun.png",
                  isChild: false,
                  rarity: "Rare",
                  tokenId: "45362345",
                  mode: "create ✨",

                  tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default function TreePage() {
  const size = useWindowSize();
  return (
    <Layout>
      <div className="mt-10 h-[80vh] mb-12">
        <p className="ml-6 text-4xl font-bold">Family Tree</p>

        <div id="treeWrapper" className="w-full h-full">
          <Tree
            orientation="vertical"
            hasInteractiveNodes="true"
            data={orgChart}
            depthFactor={420}
            translate={{ x: size.width / 2 - 200, y: 50 }}
            separation={{ siblings: 5, nonSiblings: 1 }}
            renderCustomNodeElement={(rd3tProps: any) =>
              renderRectSvgNode({
                ...rd3tProps,
                foreignObjectProps: {
                  width: 400,
                  height: 400,
                  position: "absolute",
                  top: "100px",
                },
              })
            }
            scaleExtent={{ max: 2, min: 0.5 }}
            zoom={0.8}
            rootNodeClassName={"bg-white text-white"}
          />
        </div>
      </div>
    </Layout>
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
  );
}

const renderRectSvgNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: any) => (
  <g>
    <circle r={5}></circle>
    <foreignObject {...foreignObjectProps}>
      <>
        <TreeNodeElement nodeDatum={nodeDatum} toggleNode={toggleNode} />
      </>
    </foreignObject>
  </g>
);
