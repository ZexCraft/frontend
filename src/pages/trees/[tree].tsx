import Layout from "@/components/Layout";
import React from "react";
// @ts-ignore
import Tree from "react-d3-tree";
import TreeNodeElement from "@/components/TreeNodeElement";
import useWindowSize from "@/hooks/useWindowSize";
const orgChart = {
  name: "root",
  attributes: {
    relationship: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
    nft1: {
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeigjqyt2kcfakmzhggxntsoh2rsz7ygowmcliuvso7o54unhrdpu6u/image.jpg",
      isChild: false,
      rarity: "Rare",
      tokenId: "45362345",
      mode: "create ✨",

      tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
    },
    nft2: {
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeidkssqe6hontgw6ujc5w5gug2kjzp5vxzbg7gnmug6fyppbeap7ve/image.jpg",
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
          image:
            "https://cdn.midjourney.com/87ebd8ca-98c9-47d0-968d-48ce7b625ac1/0_0.png",
          isChild: false,
          rarity: "Rare",
          tokenId: "45362345",
          mode: "create ✨",

          tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
        },
        nft2: {
          image:
            "https://cdn.midjourney.com/2e701814-f78b-4443-88ba-e76c6642d806/0_0.png",
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
              image:
                "https://cdn.midjourney.com/eaca9f3d-94ad-43eb-ae7d-6b1d0b775d38/0_0.png",
              isChild: false,
              rarity: "Rare",
              tokenId: "45362345",
              mode: "create ✨",

              tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            },
            nft2: {
              image:
                "https://cdn.midjourney.com/a2297ad1-6f12-4170-b29b-1a911ba76dce/0_0.png",
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
                  image:
                    "https://cdn.midjourney.com/a44a0796-8a95-4507-bde6-c4cd80e826bf/0_0.png",
                  isChild: false,
                  rarity: "Rare",
                  tokenId: "45362345",
                  mode: "create ✨",

                  tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                },
                nft2: {
                  image:
                    "https://cdn.midjourney.com/31f9f67e-1acf-4643-8189-7b02a613966f/0_0.png",
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
              image:
                "https://cdn.midjourney.com/eaca9f3d-94ad-43eb-ae7d-6b1d0b775d38/0_2.png",
              isChild: false,
              rarity: "Rare",
              tokenId: "45362345",
              mode: "create ✨",

              tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            },
            nft2: {
              image:
                "https://cdn.midjourney.com/26d5a566-e213-43ee-87ca-96f20d613515/0_0.png",
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
                  image:
                    "https://cdn.midjourney.com/d9222b6a-decc-4d47-9759-c74092a50867/0_0.png",
                  isChild: false,
                  rarity: "Rare",
                  tokenId: "45362345",
                  mode: "create ✨",

                  tokenAddress: "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
                },
                nft2: {
                  image:
                    "https://cdn.midjourney.com/31f9f67e-1acf-4643-8189-7b02a613966f/0_0.png",
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
