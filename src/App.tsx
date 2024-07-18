import Form from "./components/Form";
import Footer from "./shared/Footer";
// import Header from "./shared/Header";
import Hero from "./shared/Hero";

function App() {
  return (
    <div className="flex flex-col">
      {/* <Header /> */}
      <Hero />
      <Form />
      <Footer />
    </div>
  );
}

export default App;
