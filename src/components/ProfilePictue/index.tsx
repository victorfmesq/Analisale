import { FC } from "react";
import { Container, Image } from "./styles";

interface ProfilePictureProps {
  src: string;
  alt: string;
  isSmall: boolean;
}

const ProfilePicture: FC<ProfilePictureProps> = ({ alt, src, isSmall }) => {
  return (
    <Container small={isSmall}>
      <Image src={src} alt={alt}></Image>
    </Container>
  );
};

export default ProfilePicture;
