function App() {

  function sayHello() {
    alert("Hello Vijay");
  }

  return (
    <button onClick={sayHello}>
      Click
    </button>
  );
}

export default App;