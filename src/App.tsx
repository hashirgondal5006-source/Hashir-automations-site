import HashirAutomations from "./HashirAutomations";

function App() {
  // No max-width, no centering flex box here — the component itself
  // handles its own fluid, max-w-7xl inner containers per section.
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-950">
      <HashirAutomations />
    </div>
  );
}

export default App;
