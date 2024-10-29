import GalaChainProvider from "~/components/GalaChainContext";
import Content from "~/components/Content";
import Header from "~/components/Header";
import HeaderConnect from "~/components/HeaderConnect";
import ViewNoProvider from "~/components/ViewNoProvider";
import "./App.css";

function App() {
  if (!window.ethereum) {
    return (
      <>
        <Header />
        <ViewNoProvider />
      </>
    );
  }
  return (
    <>
      <GalaChainProvider>
        <Header>
          <HeaderConnect />
        </Header>
        <Content />
      </GalaChainProvider>
    </>
  );
}

export default App;
