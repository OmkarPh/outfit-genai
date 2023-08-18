import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import { SD_API_URL } from "../config/api";
import DummyResponse from "../samples/responses/txt2img.json";

const Prompter = () => {
  const [imagesBase64, updateImagesBase64] = useState<string[]>([]);
  const [prompt, updatePrompt] = useState("");
  const [loading, updateLoading] = useState(false);

  const generate = async (prompt: string) => {
    updateLoading(true);
    const result: {
      images: string[];
      parameters: Record<string, string>;
      info: string;
    } = await axios.get(`${SD_API_URL}/?prompt=${prompt}`);
    // const result = DummyResponse;
    const images = result.images;
    console.log({ result, images });
    updateImagesBase64(images);
    updateLoading(false);
  };
  console.log({ SD_API_URL });

  return (
    <ChakraProvider>
      <Container>
        <Heading>Stable DIffusion🚀</Heading>
        <Text marginBottom={"10px"}>
          This react application leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model. The model can be found via github here{" "}
          <Link href={"https://github.com/CompVis/stable-diffusion"}>
            Github Repo
          </Link>
        </Text>

        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : (
          imagesBase64 &&
          imagesBase64.map((imageBase64) => (
            <Image
              src={`data:image/png;base64,${imagesBase64}`}
              boxShadow="lg"
            />
          ))
        )}
      </Container>
    </ChakraProvider>
  );
};

export default Prompter;
