import {
    Box,
    Flex,
    Avatar,
    Text,
    Stack,
    IconButton,
    Icon,
    Button,
    useColorMode,
  } from '@chakra-ui/react';
  import { IoLogOut, IoSunny, IoMoon } from 'react-icons/io5';
  import { signOut } from 'firebase/auth';
  import { useAuthState } from 'react-firebase-hooks/auth';
  import { auth } from '../../firebaseConfig';
  
  const Profile = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [user] = useAuthState(auth);
  
    const handleLogOut = () => {
      signOut(auth);
    };
  
    if (!user) {
      return (
        <Flex align="center" justify="center" height="100vh">
          <Text fontSize="xl">Please log in to view your profile.</Text>
        </Flex>
      );
    }
  
    return (
      <Flex direction="column" align="center" p={6} minHeight="100vh">
        <Box
          width="full"
          maxWidth="md"
          boxShadow="md"
          p={6}
          borderRadius="md"
          borderWidth="1px"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
        >
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="xl"
              src={user.photoURL || 'https://via.placeholder.com/150'}
              mb={4}
            />
            <Text fontWeight="bold" fontSize="xl">
              {user.displayName || 'User'}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user.email}
            </Text>
          </Flex>
  
          <Stack spacing={4}>
            <Button
              onClick={toggleColorMode}
              leftIcon={<Icon as={colorMode === 'light' ? IoMoon : IoSunny} />}
            >
              Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
  
            <Button
              onClick={handleLogOut}
              leftIcon={<Icon as={IoLogOut} />}
              colorScheme="red"
            >
              Log Out
            </Button>
          </Stack>
        </Box>
      </Flex>
    );
  };
  
  export default Profile;
  