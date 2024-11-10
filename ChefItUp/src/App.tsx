import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

import { IngredientContextProvider } from "./context/ingredients-context";
import { MacroContextProvider } from "./context/macro-context";

function App() {
  return (
    <IngredientContextProvider>
      <MacroContextProvider>
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<DocsPage />} path="/docs" />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </MacroContextProvider>
    </IngredientContextProvider>
  );
}

export default App;
