function Home() {
  
  const username = "soufyane";

  return (
    <div className="page">
      <h2 className="page-title">
        Hello {username}
      </h2>

      <p style={{ color: "var(--muted)", marginTop: "8px" }}>
        choise from the sidebar
      </p>
    </div>
  );
}

export default Home;