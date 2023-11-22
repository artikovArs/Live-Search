import {
   Box,
   Button,
   Container,
   Flex,
   Grid,
   GridItem,
   Image,
   Input,
   Link,
   Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
   const [card, SetCard] = useState([]);
   const [value, setValue] = useState("") 

   useEffect(() => {
      axios
         .get("https://dummyjson.com/products")
         .then((result) => SetCard(result.data.products));
   }, []);

   const filtercard = card.filter((item) => {
    return item.brand.toLowerCase().includes(value.toLowerCase())
   })

   return (
      <>
         <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"25px 300px"}
            bg={"#242425"}
            color={"white"}
         >
            <Text fontSize={"24px"}>Logo</Text>
            <Flex gap={"20px"}>
               <Link fontSize={"18px"}>Home</Link>
               <Link fontSize={"18px"}>About</Link>
               <Link fontSize={"18px"}>Contact</Link>
            </Flex>
            <Button colorScheme="purple">Log in</Button>
         </Box>

         <Container maxW={"container.xl"} mt={"70px"}>
            <Box width={"100%"}>
               <Input width={"100%"} placeholder="Type country name" onChange={(e) => setValue(e.target.value)} />
               <Grid templateColumns={"repeat(4,1fr)"} width={"100%"}>
                  {filtercard.map((item) => {
                     return <GridItem key={item.id} padding={"15px 25px"}>
                      <Image width={"450px"} height={"300px"} src={item.images[0]}/>
                      <Box>
                        <Text>{item.title}</Text>
                        <Text>{item.brand}</Text>
                        <Text>$ {item.price}</Text>
                      </Box>
                     </GridItem>
                  })}
               </Grid>
            </Box>
         </Container>
      </>
   );
};

export default App;
