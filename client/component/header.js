import Link from "next/link";

export default function ({ currentUser }) {
  const links = [
    !currentUser && { label: "Login", href: "/auth/login" },
    !currentUser && { label: "Register", href: "/auth/register" },
    currentUser && { label: "Logout", href: "/auth/logout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} style={{ textDecoration: "none" }}>
            <span className="nav-link">{label}</span>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light">
      <Link href="/" style={{ textDecoration: "none" }}>
        <span className="navbar-brand">TixTick</span>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-align-items-center">{links}</ul>
      </div>
    </nav>
  );
}
