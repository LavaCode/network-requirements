import React, { useState } from "react";
import { Lock, LogOut, ExternalLink, AlertCircle, Shield } from "lucide-react";

const PASSWORD = process.env.REACT_APP_LOGIN_PASSWORD;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    if (password === PASSWORD) {
      setLoggedIn(true);
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPassword("");
  };

  const handleCardClick = (href) => {
    window.open(href, "_blank");
    setLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        {!loggedIn ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-10 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-sky-500/10 p-4 rounded-full">
                <Shield className="w-8 h-8 text-sky-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-center">Access Portal</h1>
            <p className="text-slate-400 mb-8 text-sm text-center">
              Device Network Requirements<br /> Authentication Required
            </p>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Access Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-slate-500" />
              </div>
              <input
                type="password"
                className="w-full rounded-lg bg-slate-900/80 border border-slate-700 pl-10 pr-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-[1.02]"
            >
              Sign In
            </button>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Incorrect password. Please try again.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-7xl w-full shadow-2xl">
            <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-sky-500/10 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-sky-400" />
                  </div>
                  <h1 className="text-2xl font-bold">Device Network Requirements</h1>
                </div>
                <p className="text-slate-400 text-sm ml-14">
                  Click any device card to view detailed network configuration requirements in a new tab.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-slate-600 text-slate-300 rounded-lg px-4 py-2 hover:bg-slate-700/50 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 border border-sky-500/20 p-5 rounded-xl mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-sky-100">
                  <strong className="text-sky-300">Important:</strong> Review each device's requirements carefully. Clicking a card opens detailed documentation in a new tab and resets your session. For the Biff Dipper animatronic, use the "View Details" button to access firewall configuration guidance.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card
                title="QSC / Q-SYS"
                importance="CRITICAL"
                importanceLevel="critical"
                notes="Extended source (online):"
                href="https://q-syshelp.qsc.com/content/Networking/Q-SYS_Networking.htm"
                onClick={handleCardClick}
              />
              <Card
                title="Pharos"
                importance="HIGH"
                importanceLevel="high"
                notes="Source (PDF): Pharos network requirements PDF"
                href="https://dl.pharoscontrols.com/documentation/application_notes/archive/Pharos_Network_Guidelines.pdf"
                onClick={handleCardClick}
              />
              <Card
                title="Biff Dipper Animatronic"
                subtitle="Mission Briefing Room"
                importance="HIGH"
                importanceLevel="high"
                notes="Source: See detailed modal"
                isBiff
                onOpenModal={() => setShowModal(true)}
              />
              <Card
                title="BrightSign"
                importance="NORMAL"
                importanceLevel="normal"
                notes="Source (online): BrightSign network requirements\nSource (online): BrightSign network requirements for synchronized playback"
                href="https://docs.brightsign.biz/advanced/bsn-ports-and-urls"
                onClick={handleCardClick}
              />
              <Card
                title="BrightSign Sync Playback"
                importance="NORMAL"
                importanceLevel="normal"
                notes="Detailed sync playback network considerations"
                href="https://docs.brightsign.biz/advanced/sync-network-and-switch-settings"
                onClick={handleCardClick}
              />
            </div>

            {showModal && <BiffModal onClose={() => setShowModal(false)} />}
          </div>
        )}
      </div>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-400 text-xs">
          <div>Last version: September 30, 2025</div>
          <div>
            Developed by <a href="mailto:kasperz@2heads.com" className="text-sky-400 hover:underline">--kasper.</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Card = ({ title, subtitle, importance, importanceLevel, notes, href, onClick, isBiff, onOpenModal }) => {
  const importanceColors = {
    critical: "border-red-500/30 bg-red-500/5",
    high: "border-orange-500/30 bg-orange-500/5",
    normal: "border-sky-500/30 bg-sky-500/5",
    varies: "border-slate-500/30 bg-slate-500/5"
  };

  const importanceBadgeColors = {
    critical: "bg-red-500/20 text-red-300 border-red-500/30",
    high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    normal: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    varies: "bg-slate-500/20 text-slate-300 border-slate-500/30"
  };

  return (
    <div
      className={`${importanceColors[importanceLevel]} border bg-slate-700/20 backdrop-blur-sm p-5 rounded-xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 hover:border-opacity-50`}
      onClick={() => href && onClick(href)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="font-semibold text-slate-100 mb-1">{title}</div>
          {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
        </div>
        <span className={`text-xs px-2 py-1 rounded-md border font-medium whitespace-nowrap ml-2 ${importanceBadgeColors[importanceLevel]}`}>
          {importance}
        </span>
      </div>
      <pre className="whitespace-pre-wrap text-xs text-slate-300 mb-4 leading-relaxed">{notes}</pre>
      {isBiff ? (
        <button
          className="flex items-center gap-2 text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-2 rounded-lg hover:bg-sky-500/20 transition text-sm font-medium w-full justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
        >
          View Details
        </button>
      ) : (
        <button
          className="flex items-center gap-2 text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-2 rounded-lg hover:bg-sky-500/20 transition text-sm font-medium w-full justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onClick(href);
          }}
        >
          <span>Open Requirements</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

const BiffModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-slate-900 border border-slate-700/50 max-w-4xl w-full rounded-2xl p-8 relative overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg p-2 transition"
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-500/10 p-2 rounded-lg">
          <Shield className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Biff Dipper Animatronic</h2>
          <p className="text-sm text-slate-400">Network & Firewall Configuration Guide</p>
        </div>
      </div>

      <div className="overflow-auto flex-1 pr-2 custom-scrollbar">
        <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
          <section>
            <h3 className="font-semibold text-slate-100 mb-2 text-base">Overview</h3>
            <p>Robots require an internet connection. This page describes how that connection is used, and offers help with configuring firewalls.</p>
            <p className="mt-2">Robots should work with an out of the box domestic/home office NAT based router with no special configuration. Problems may arise on larger networks where administrators may have blocked or filtered services for security or other reasons.</p>
            <p className="mt-2">A network check tool is available which can be used to check the network configuration prior to robot installation.</p>
            <p className="mt-2">Robots use common DHCP (UDP ports 67/68), and DNS on UDP port 53. They use the ipv4 address scheme.</p>
          </section>

          <section className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-orange-300 mb-2 text-base">Firewall Exceptions</h3>
            <p>Here is a list of exceptions for networks which block/filter all or most traffic by default.</p>
            <p className="mt-2">When possible we suggest you use domain names rather than IP addresses in your firewall configuration, we do not guarantee we won't change these IP addresses at short notice. The latest updated IP addresses, as of July 17, 2023, are mentioned here to help you in case of any difficulty while setting up.</p>
            <p className="mt-2">All connections are initiated by the robot connecting as a client to a remote server or via peer-to-peer means negotiated via NAT Traversal. No port forwards/redirects etc are required from the external internet facing address to the internal robot one.</p>
          </section>

          <section>
            <h3 className="font-semibold text-red-300 mb-2 text-base">Mandatory for Customer Support</h3>
            <div className="bg-slate-800/50 rounded-lg p-3 font-mono text-xs">
              <p><span className="text-sky-400">TCP [OUT]:</span> update.robot-thespian.co.uk (62.3.104.54) on <span className="text-green-400">PORT 2022</span></p>
              <p className="text-slate-400 mt-1 font-sans">Enables command line level access for Engineered Arts (EA) support and facilitating the robot's software package downloads.</p>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-red-300 mb-2 text-base">Mandatory for Normal Day-to-Day Operation</h3>

            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="font-mono text-xs"><span className="text-sky-400">TCP [OUT]:</span> tritiumrobot.cloud on <span className="text-green-400">PORT 443</span></p>
                <p className="text-slate-400 mt-2 text-xs">Required for customer and EA's access to the web-based remote admin interface and WebRTC connection negotiation, as well as Tritium AI. This service is geo-located in three regions around the globe using latency based DNS routing. The specific regions can be reached at:</p>
                <ul className="mt-2 space-y-1 text-xs font-mono text-slate-300 ml-4">
                  <li>• <span className="text-yellow-400">EMEA (London):</span> uk.tritiumrobot.cloud 18.134.18.162 & 13.41.35.109</li>
                  <li>• <span className="text-yellow-400">AMER (Oregon):</span> us.tritiumrobot.cloud 44.225.252.52 & 44.229.49.140</li>
                  <li>• <span className="text-yellow-400">APAC (Singapore):</span> ap.tritiumrobot.cloud 18.138.14.129 & 18.136.55.137</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="font-mono text-xs"><span className="text-sky-400">TCP [OUT]:</span> One or more of time1.google.com, time2.google.com, time3.google.com, time4.google.com</p>
                <p className="text-slate-400 mt-2 text-xs">For accurate time which is required for authentication.</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="font-mono text-xs"><span className="text-sky-400">UDP and TCP [IN and OUT]:</span> stun.engineeredarts.co.uk (35.177.202.92) and tritium-prod-stun.earts.dev (13.43.153.64) on <span className="text-green-400">PORT 3478</span></p>
                <p className="text-slate-400 mt-2 text-xs">For WebRTC NAT traversal, when the robot is not on the same LAN as the PC running the User Interface.</p>
              </div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 mt-3 text-xs">
              <p className="text-sky-300">The ideal network situation is for the robot and a PC running the User Interface to be on the same LAN. In this situation the robot can use its connection to tritiumrobot.cloud to broker a direct encrypted connection over LAN. This will use a random "high port", and is the lowest latency, and most reliable connection option.</p>
              <p className="text-sky-300 mt-2">In other situations a direct connection may be established using a technique called NAT Traversal. If NAT Traversal then fails, the final fallback is a TURN proxy server - the highest latency and least reliable connection type.</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-3 mt-3">
              <p className="font-mono text-xs"><span className="text-sky-400">UDP and TCP [IN and OUT]:</span> Connections to turn.engineeredarts.co.uk (35.177.202.92) and tritium-prod-turn.earts.dev (13.43.153.64) on <span className="text-green-400">PORT 3478 and 5349</span></p>
              <p className="text-slate-400 mt-2 text-xs">Needed for WebRTC connection proxying, when NAT traversal fails and the robot is not on the same LAN as the PC running the User Interface.</p>
            </div>
          </section>

          <section className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-red-300 mb-2 text-base">Customer Support - Importance of Accessibility</h3>
            <p>To deliver efficient and timely support, EA requires reliable access to the robot. Our support services might be compromised without this. It is therefore recommended to allow access for all of the network ports mentioned on this page.</p>
          </section>

          <section>
            <h3 className="font-semibold text-slate-100 mb-2 text-base">Bandwidth Requirements</h3>
            <p>Higher bandwidth access translates into improved robotic function. It also facilitates quicker remote management, animator transfers, and enhances the telepresence feature's usability and speed.</p>
            <p className="mt-2">Telepresence, our most bandwidth-demanding feature, uses WebRTC to stream audio bidirectionally, stream video from robot to operator, and commands from operator to robot.</p>
            <div className="bg-slate-800/50 rounded-lg p-3 mt-3">
              <p className="font-semibold text-slate-200 text-xs">Minimum Requirements (tested May 16, 2017):</p>
              <ul className="mt-2 space-y-1 text-xs ml-4">
                <li>• <span className="text-green-400">Download:</span> 4 Mbit/s</li>
                <li>• <span className="text-green-400">Upload:</span> 8 Mbit/s</li>
              </ul>
              <p className="text-slate-400 mt-2 text-xs">Greater speeds would yield better results.</p>
            </div>
          </section>
        </div>
      </div>
    </div>

    <style>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.5);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(71, 85, 105, 0.8);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(100, 116, 139, 0.9);
      }
    `}</style>
  </div>
);

export default App;