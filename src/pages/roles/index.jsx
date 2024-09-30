import { Button } from "@/components/button";
import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";

const Roles = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Rollar</Title>
        <Button name="Rol yaratish" />
      </Header>
      <CustomTable columns={[]} data={[]} />
    </Wrapper>
  );
};

export default Roles;
