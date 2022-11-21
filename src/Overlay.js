import styles from "./Overlay.module.css";

export function Overlay() {
  return (
    <div className={styles.container}>
      <header>
<h1 align="center">Hi 👋, I'm Khristin</h1>
<h3>I'm a Multidisciplinary Artist & Front-End Developer</h3>
        <nav>
          <a
            href="https://khristinschenk.com/"
            rel="noreferrer"
            className={styles.selected}
          >
            Portfolio
          </a>
          <a href="https://khristinschenk.com/" target="_blank" rel="noreferrer">
            Contact
          </a>
        </nav>
      </header>
      <section>
<p>Press & Drag to rotate, or touch the objects to interact.
</p>
      </section>
      <footer><h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://codepen.io/khristin-schenk" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codepen.svg" alt="khristin-schenk" height="30" width="40" /></a>
<a href="https://www.linkedin.com/in/khristin-schenk/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="www.linkedin.com/in/khristin-schenk" height="30" width="40" /></a>
<a href="https://instagram.com/atomic_ann" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="atomic_ann" height="30" width="40" /></a>
</p></footer>
    </div>
  );
}
