import Link from "next/link";
import { auth } from "@/auth";

const features = [
  "Windows Basic Tweaks",
  "Windows Advanced Tweaks (200+ Combined Windows Tweaks)",
  "Basic CPU Tweaks",
  "Basic Services Tweaks",
  "Basic Power Saving Tweaks Disabling",
  "GPU Tweaks",
  "USB Tweaks",
  "System and Game File Cleaner",
  "Post Install Guide",
  "+ More"
];

export default async function HomePage() {
  const session = await auth();
  const paynowUrl = process.env.PAYNOW_PRODUCT_URL_REGULAR || "#";

  return (
    <>
      <nav className="site">
        <div className="brand">OptiX</div>
        <div className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#features">Features</a>
          <a href="#proof">Proof</a>
          <a href="#community">Community</a>
          {session ? <Link href="/account">Account</Link> : <Link href="/login">Login</Link>}
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="pill">100+ vouches • 500+ members • 24/7 support</div>
          <h1>
            Zero latency. Max FPS.
            <span className="grad"> One utility that does it all.</span>
          </h1>
          <p>
            OptiX Reg Auto Tweaker is built for users who want stronger performance, cleaner stability,
            and a simple interface without digging deep into manual optimization.
          </p>
        </section>

        <section className="section hero-card">
          <div className="card">
            <h2 id="shop">OptiX Regular Tweaking Utility</h2>
            <p>Simple. Powerful. Reliable optimization for Windows 10 and 11.</p>
            <div className="shop-card">
              <div>
                <div className="price">$4.99</div>
                <p className="small">Link this button to your PayNow product URL after product creation.</p>
              </div>
              <a className="btn" href={paynowUrl}>Buy Now</a>
            </div>
          </div>

          <div className="card">
            <h3>Potential improvements</h3>
            <div className="kpis">
              <div className="kpi"><strong>50%</strong><span className="small">up to reduction in input latency</span></div>
              <div className="kpi"><strong>30%</strong><span className="small">up to improvement in FPS</span></div>
              <div className="kpi"><strong>Win 10/11</strong><span className="small">OS compatibility</span></div>
              <div className="kpi"><strong>24/7</strong><span className="small">support</span></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="card">
            <h2 id="features">Features</h2>
            <div className="feature-list">
              {features.map((feature) => (
                <div key={feature} className="feature">{feature}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="section grid cols-2">
          <div className="card">
            <h2>Who should purchase?</h2>
            <p>
              OptiX Reg Auto Tweaker is perfect for users who want a user-friendly interface while maintaining system stability.
              It is built for people chasing a small FPS boost, cleaner responsiveness, or improved reliability without diving deep
              into PC optimization details. Changes are designed to stay practical, and the setup can be reverted if needed.
            </p>
          </div>
          <div className="card" id="proof">
            <h2>Trusted by the community</h2>
            <ul className="muted-list">
              <li>100+ vouches from pro players and testers</li>
              <li>500+ Discord members</li>
              <li>5-star reviews</li>
              <li>24/7 support</li>
            </ul>
            <div className="row" style={{marginTop:"14px"}}>
              <a className="btn secondary" href="https://discord.com/channels/1159410067280494592/1165207015249944626" target="_blank" rel="noopener noreferrer">View Reviews</a>
            </div>
          </div>
        </section>

        <section className="section card" id="community">
          <h2>Community</h2>
          <div className="row">
            <a className="btn secondary" href="https://discord.gg/pBQNDpBcRu" target="_blank" rel="noopener noreferrer">Discord</a>
            <a className="btn secondary" href="https://www.youtube.com/@getOptix" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a className="btn secondary" href="https://twitter.com/getOptix" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </section>
      </main>

      <div className="footer">© 2022 OptiX</div>
    </>
  );
}
