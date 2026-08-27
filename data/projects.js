export const projects = [
  {
    title: 'CCHAT',
    kind: 'C chat project',
    active: '2026 -',
    text: 'A small chat application built in C around TCP client-server communication. It gives me a focused way to practice low-level structure, Meson and Ninja build tooling, memory discipline, and Linux debugging with Valgrind.',
    stack: ['C', 'TCP sockets', 'Client-server', 'Meson', 'Ninja', 'Linux', 'CLI', 'Valgrind'],
    repo: 'https://github.com/M9GLiquid/CCHAT'
  },
  {
    title: 'Mermaid Overlay',
    kind: 'Computer vision / calibration',
    active: '2025',
    text: 'A Python and OpenCV pipeline that corrects fisheye camera images, rectifies a robot arena, builds navigation grids, and maps image coordinates into real-world robot positions. Its exported API packages the calibration data for reuse by navigation components.',
    stack: ['Python', 'OpenCV', 'Computer vision', 'Fisheye correction', 'Homography', 'Coordinate mapping', 'Calibration', 'Testing'],
    repo: 'https://github.com/M9GLiquid/Mermaid-Overlay'
  },
  {
    title: 'Mermaid Integration',
    kind: 'Robotics / systems integration',
    active: '2025',
    text: 'An integration layer that connects hand-gesture recognition, camera-to-grid transformation, map interaction, A* pathfinding, and ROS2 robot positioning through modular Python APIs. The separated modules remain independently testable and replaceable.',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'ROS2', 'A* pathfinding', 'Robotics', 'API integration', 'Testing'],
    repo: 'https://github.com/M9GLiquid/Mermaid-Integration'
  },
  {
    title: 'Disaster Sim CoppeliaSim',
    kind: 'Robotics / simulation',
    active: '2025',
    text: 'A drone disaster-response simulation in CoppeliaSim combining procedural environments, waypoint navigation, RGB-D sensing, and victim detection. Event-driven captures produce structured datasets for later AI experiments while keeping navigation and sensing behavior observable.',
    stack: ['Python', 'AI', 'CoppeliaSim', 'Robotics', 'RGB-D sensing', 'Procedural generation', 'Data collection', 'Simulation tooling'],
    repo: 'https://github.com/M9GLiquid/disaster-sim-coppeliasim'
  },
  {
    title: '2D Dungeon Map NL Generator',
    kind: 'AI / procedural generation',
    active: '2024',
    text: 'A natural-language dungeon generator that turns plain-English prompts into structured 2D maps. It combines OpenAI-based feature extraction with deterministic placement rules and A* pathfinding so the generated layout remains understandable and navigable.',
    stack: ['Python', 'OpenAI API', 'NLP', 'Procedural generation', 'A* pathfinding', 'Terminal rendering', 'Prompt design'],
    repo: 'https://github.com/M9GLiquid/2D-Dungeon-Map-NL-Generator'
  },
  {
    title: 'Green House',
    kind: 'Systems / automation',
    active: '2023',
    text: 'An embedded C system that monitors temperature and light intensity and controls greenhouse actuators to keep conditions within target ranges. The project connects sensors, real-time control decisions, hardware integration, and memory-conscious implementation.',
    stack: ['Embedded C', 'Sensors', 'Actuators', 'Real-time control', 'Memory efficiency', 'Hardware integration'],
    repo: 'https://github.com/M9GLiquid/Green_House_Project'
  },
  {
    title: 'RTES',
    kind: 'Low-level / embedded',
    active: '2023',
    text: 'A real-time embedded systems project centered on a small microkernel. It explores task scheduling, inter-process communication, testing, and memory management while keeping the implementation close to the underlying hardware.',
    stack: ['C', 'RTOS', 'Microkernel', 'Task scheduling', 'IPC', 'Testing', 'Memory management'],
    repo: 'https://github.com/M9GLiquid/Real-Time-Micro-Kernal'
  },
  {
    title: 'Conquest',
    kind: 'Minecraft plugin',
    active: '2016 - 2019',
    text: 'A substantial Spigot plugin developed for a live Minecraft server environment. It taught me long-term feature ownership through event-driven gameplay systems, asynchronous behavior, text parsing, and SQLite-backed persistence.',
    stack: ['Java', 'SQL', 'SQLite', 'Spigot', 'Async systems', 'text-parsing', 'Event-driven design', 'Gameplay systems'],
    repo: 'https://github.com/M9GLiquid/Conquest'
  },
];
