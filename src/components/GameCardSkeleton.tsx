import { Card, CardBody, Skeleton, SkeletonText, Box } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card width="100%" height="auto" borderRadius={10} overflow="hidden">
      <Box width="100%" height="200px">
        <Skeleton height="100%" />
      </Box>
      <CardBody>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
