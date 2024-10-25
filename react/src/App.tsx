import EthereumProvider from "~/components/EthereumContext";
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
      <EthereumProvider>
        <Header>
          <HeaderConnect />
        </Header>
        <Content />
      </EthereumProvider>
    </>
  );
}

export default App;
