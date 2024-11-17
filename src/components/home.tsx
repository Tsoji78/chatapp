import { Box, Grid,GridItem,Flex,Avatar,Text,Button,IconButton,Icon,useColorMode,useToast,
  } from '@chakra-ui/react';
  import { IoHeart, IoChatbubble, IoShareSocial } from 'react-icons/io5';
  import { useCollection } from 'react-firebase-hooks/firestore';
  import { collection } from 'firebase/firestore';
  import { db } from '../../firebaseConfig';
  
  const Home = () => {
    const { colorMode } = useColorMode();
    const toast = useToast();
  
    // Fetch posts from Firestore
    const [postsValue] = useCollection(collection(db, 'posts'));
  
    const posts = postsValue?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    const handleFollow = (userId: string) => {
      toast({
        title: `Followed User ${userId}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    };
  
    const handleShare = (postId: string) => {
      toast({
        title: `Post ${postId} shared!`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    };
  
    const handleComment = (postId: string) => {
      toast({
        title: `Commented on Post ${postId}!`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    };
  
    return (
      <Box p={6} bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
        <Text fontSize="2xl" mb={4}>
          Posts
        </Text>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {posts?.map((post) => (
            <GridItem
              key={post.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              boxShadow="sm"
            >
              <Flex align="center" mb={4}>
                <Avatar src={post.authorPhoto} mr={4} />
                <Flex direction="column">
                  <Text fontWeight="bold">{post.authorName}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(post.timestamp?.toDate()).toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
              <Text mb={4}>{post.content}</Text>
              <Flex justify="space-between" align="center">
                <Button
                  leftIcon={<Icon as={IoHeart} />}
                  onClick={() => handleFollow(post.authorId)}
                  colorScheme="red"
                  variant="outline"
                >
                  Follow
                </Button>
                <IconButton
                  icon={<Icon as={IoChatbubble} />}
                  aria-label="Comment"
                  onClick={() => handleComment(post.id)}
                  variant="outline"
                />
                <IconButton
                  icon={<Icon as={IoShareSocial} />}
                  aria-label="Share"
                  onClick={() => handleShare(post.id)}
                  variant="outline"
                />
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default Home;
  