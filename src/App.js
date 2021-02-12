import './App.css';
import Header from './components/Header'
import Characters from './components/Characters'

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Rick and Morty</h1>
      <Characters />
    </div>
  );
}

export default App;
