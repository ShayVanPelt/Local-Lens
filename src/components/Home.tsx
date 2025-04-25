import { Container } from "@mantine/core";

const Home = () => {
  return (
    <Container>
      <div>
        <div className="flex  flex-col items-center justify-center p-8 pb-16">
          <h1 className="text-4xl font-bold text-white">Local Lens</h1>
          <p className="mt-4 text-lg text-white">
            Visualizing quality-of-life data across Canada
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Home;
