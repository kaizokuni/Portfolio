export const personalInfo = {
  name: "Yassine Ouhannou",
  age: 23,
  location: "Rabat, Morocco",
  email: "yassinouhannou85@gmail.com",
  phone: "+212 657 069 229",
  linkedin: "https://www.linkedin.com/in/ouhannou-yassine-130864213",
  education: "EMSI Rabat - Computer Engineering & Networks",
  specialization: "Cybersecurity",
  year: "5th Year Engineering Student",
  languages: ["Arabic: Native", "French: Fluent", "English: Advanced"],
  bio: "Passionate about system security, network hardening, and building resilient infrastructures. Oriented towards vulnerability management, automation of security controls, and hands-on supervision & hardening.",
};

export const roles = [
  "Cybersecurity Engineer",
  "Ethical Hacker",
  "Network Security Specialist",
  "Penetration Tester",
  "Secure Developer",
];

export const stats = [
  { icon: "[~]", number: 6, label: "Certifications" },
  { icon: "{*}", number: 8, label: "Projects" },
  { icon: "</>", number: 5, label: "Years of Study" },
  { icon: "[!]", number: 3, label: "Internships" },
];

export const skills = [
  {
    category: "Secure Development",
    items: [
      { name: "Python", level: 90 },
      { name: "PHP / Laravel", level: 80 },
      { name: "Java / Spring Boot / JEE", level: 85 },
      { name: "C / C++", level: 75 },
      { name: "HTML / CSS / JavaScript", level: 85 },
      { name: "React / Django", level: 75 },
    ],
  },
  {
    category: "Cybersecurity & Networks",
    items: [
      { name: "Nmap / Nessus", level: 85 },
      { name: "Metasploit / Burp Suite", level: 80 },
      { name: "Wireshark / Packet Tracer", level: 85 },
      { name: "Cisco / PFSense", level: 80 },
      { name: "VLAN / VPN / DMZ", level: 85 },
      { name: "SQLi / XSS Prevention", level: 80 },
    ],
  },
  {
    category: "DevOps & Systems",
    items: [
      { name: "Docker / Kubernetes", level: 80 },
      { name: "Linux Administration", level: 85 },
      { name: "Git / GitHub", level: 80 },
      { name: "SQL / PostgreSQL / Oracle", level: 75 },
      { name: "Power BI / ETL / DAX", level: 70 },
      { name: "UML / Agile (Scrum)", level: 75 },
    ],
  },
];

export const experiences = [
  {
    title: "Cybersecurity Intern — PFE (End-of-Studies Project)",
    company: "EMSI Rabat",
    location: "Rabat, Morocco",
    date: "Feb 2026 - Present",
    details: [
      "Designing & deploying a Cloud-Native Security Operations Center (SOC) on K3s Kubernetes",
      "Deployed full Wazuh Stack (Indexer, Manager, Dashboard) via Helm for SIEM capabilities",
      "Implemented Zero-Trust network access using Tailscale Mesh VPN across the infrastructure",
      "Integrating Sigstore/Cosign for container image provenance & admission control",
      "Building runtime security with eBPF-based Falco rules and Suricata network intrusion detection",
    ],
    tags: ["K3s", "Wazuh", "Tailscale", "Sigstore", "Falco", "eBPF", "Suricata", "Helm"],
    current: true,
  },
  {
    title: "Network & Security Intern",
    company: "Ministère du Transport et de la Logistique",
    location: "Rabat",
    date: "Jul - Aug 2025",
    details: [
      "Designed a segmented architecture (VLAN/DMZ, firewall) and configured AD/DHCP/DNS",
      "Implemented server supervision and hardening at the datacenter",
      "Strengthened network perimeter security and access control policies",
    ],
    tags: ["VLAN", "DMZ", "Active Directory", "Firewall", "Server Hardening"],
  },
  {
    title: "Development Intern",
    company: "Agro Juice Processing",
    location: "Meknès",
    date: "Jun - Aug 2024",
    details: [
      "Performed SQL audits and fixed vulnerabilities; prevented SQL injection & XSS attacks",
      "Built a secure stock management application",
      "Developed Python optimization scripts achieving +15% efficiency improvement",
    ],
    tags: ["SQL Audit", "XSS Prevention", "Python", "Security"],
  },
  {
    title: "Engineering Student — Cybersecurity",
    company: "EMSI Rabat",
    location: "École Marocaine des Sciences de l'Ingénieur",
    date: "2021 - Present",
    details: [
      "Computer Engineering & Networks, specialization in Cybersecurity",
      "Core modules: System Security, Networks (TCP/IP, VLAN, VPN), Ethical Hacking, Cryptography, DevOps",
    ],
    tags: [],
  },
];

export const projects = [
  {
    icon: "[$]",
    year: "2026",
    title: "Cloud-Native SOC on Kubernetes",
    desc: "Full Security Operations Center built on K3s with Wazuh SIEM, Falco runtime security (eBPF), Suricata IDS, and Sigstore image signing — all behind a Tailscale Zero-Trust mesh VPN.",
    tags: ["K3s", "Wazuh", "Falco", "eBPF", "Suricata", "Sigstore", "Tailscale"],
    current: true,
  },
  {
    icon: "[!]",
    year: "2025",
    title: "Intrusion Detection & Threat Analysis",
    desc: "Enterprise network intrusion detection system with real-time threat analysis and automated alerting for suspicious network activities.",
    tags: ["IDS", "Network Security", "Threat Analysis"],
  },
  {
    icon: "{>}",
    year: "2025",
    title: "Decision Support System",
    desc: "Data-driven decision support system for warehouse sales performance analysis over time using advanced analytics and visualization.",
    tags: ["Excel", "Power BI", "Data Analysis"],
  },
  {
    icon: "[%]",
    year: "2025",
    title: "Log Analysis & Dashboards",
    desc: "ETL pipeline with DAX-powered anomaly detection dashboards in Power BI for real-time log monitoring and security event correlation.",
    tags: ["ETL", "DAX", "Power BI", "Anomaly Detection"],
  },
  {
    icon: "<!>",
    year: "2024",
    title: "Web Application Pentest",
    desc: "Full penetration test of a web application using Nmap, Burp Suite. Exploited SQLi/XSS vulnerabilities and delivered a remediation report.",
    tags: ["Nmap", "Burp Suite", "SQLi", "XSS"],
  },
  {
    icon: "[#]",
    year: "2024",
    title: "Secure Network Simulation",
    desc: "Simulated a secure network environment with VLAN segmentation, NAT configuration, firewall filtering, and Wireshark traffic analysis.",
    tags: ["VLAN", "NAT", "Firewall", "Wireshark"],
  },
  {
    icon: "</>",
    year: "2023",
    title: "Waste Collection Optimization",
    desc: "Heuristic method for city waste collection route optimization using Dijkstra's algorithm, built with Python, Flask, and Pandas.",
    tags: ["Python", "Flask", "Pandas", "Dijkstra"],
  },
];

export const certifications = [
  {
    badge: "[G]",
    title: "Foundations of Cybersecurity",
    issuer: "Google — Coursera",
    date: "Sept. 2025",
  },
  {
    badge: "[P]",
    title: "Cybersecurity Foundation",
    issuer: "Palo Alto Networks — Coursera",
    date: "Sept. 2025",
  },
  {
    badge: "[I]",
    title: "Introduction to Containers",
    issuer: "IBM — Coursera",
    date: "Jun. 2025",
    tags: ["Docker", "Kubernetes", "OpenShift"],
  },
  {
    badge: "[W]",
    title: "Virtual Networks in Azure",
    issuer: "Whizlabs — Coursera",
    date: "Jun. 2025",
  },
  {
    badge: "[G]",
    title: "Introduction to Git and GitHub",
    issuer: "Google — Coursera",
    date: "Jun. 2025",
  },
  {
    badge: "[J]",
    title: "The Unix Workbench",
    issuer: "Johns Hopkins University — Coursera",
    date: "May 2024",
  },
];

export const bootLines = [
  "[*] Initializing system...",
  "[*] Loading kernel modules...",
  "[+] Network interface: UP",
  "[+] Firewall status: ACTIVE",
  "[*] Establishing secure connection...",
  "[+] Connection established via TLS 1.3",
  "[+] Identity verified: yassine@ouhannou",
  "[*] Loading portfolio...",
  "[OK] System ready.",
];

export const navLinks = [
  { href: "#home", label: "./home" },
  { href: "#about", label: "./about" },
  { href: "#skills", label: "./skills" },
  { href: "#experience", label: "./experience" },
  { href: "#projects", label: "./projects" },
  { href: "#certifications", label: "./certs" },
  { href: "#contact", label: "./contact" },
];
