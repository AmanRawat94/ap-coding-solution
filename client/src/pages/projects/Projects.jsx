import CallToAction from "../../components/callToAction/CallToAction";

const Projects = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex  justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Pojects</h1>
      <p className="text-md text-gray-500 dark:text-white">
        Unleash your creativity and transform your ideas into reality with the
        power of coding and development. Dive into endless possibilities and
        start building your future today!
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
