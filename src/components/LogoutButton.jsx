function LogoutButton() {
    const handleLogout = async () => {
      await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });
  
      window.location.href = "/login";
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  
  export default LogoutButton;