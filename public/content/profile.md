---
# This file is the website's content source. Keep the --- delimiters.
# YAML above the closing delimiter holds structured entries; Markdown below
# supplies the About text. See README.md for editing and publishing.
name: Davian R. Chin
initials: DC
credentials: FIMA
role: Scientific machine learning researcher & STEM educator
location: United Kingdom
affiliation: University of Reading
email: d.r.chin@pgr.reading.ac.uk
updated: '2026-09-25'
description: Davian R. Chin — scientific machine learning researcher, PhD candidate at the University of Reading, and STEM educator. Fractional calculus, stochastic dynamics, and reproducible research software.
hero:
  eyebrow: Mathematics · Machine learning · Education
  heading: Understanding complexity.
  emphasis: Connecting ideas.
  summary: I study memory and scale in stochastic systems, build scientific machine learning tools, and bring mathematical ideas to life through teaching.
  note: PhD researcher at the University of Reading
links:
  - label: GitHub
    url: https://github.com/dave2k77
  - label: ORCID
    url: https://orcid.org/0009-0003-9434-3919
  - label: LinkedIn
    url: https://www.linkedin.com/in/davianc
facts:
  - value: Scientific ML
    label: Research & software
  - value: 15+ years
    label: Teaching & leadership
  - value: FIMA
    label: Fellow of the IMA
research:
  intro: How can we distinguish genuine memory from apparent structure in complex data? My work connects mathematical foundations, careful inference, and reproducible computation.
  topics:
    - title: Memory & stochastic dynamics
      label: 01 / INFERENCE
      description: Long-range dependence, heavy-tailed processes, and the limits of inference from finite time series. Separating persistent dependence from roughness, tails, and nonstationarity.
      tags: [Long-range dependence, Stochastic processes, Wavelets]
    - title: Fractional & scientific machine learning
      label: 02 / METHODS
      description: Fractional calculus and dynamical systems meet differentiable programming, neural operators, and physics-informed learning.
      tags: [Fractional calculus, Neural operators, JAX / PyTorch]
    - title: Brain-inspired mathematical models
      label: 03 / APPLICATIONS
      description: Criticality and scale-free dynamics in brain networks motivate my mathematical research. Biomedical and clinical validation remain longer-term applications.
      tags: [Computational neuroscience, Criticality, Multiscale dynamics]
  current:
    label: CURRENT DOCTORAL WORK
    title: Trustworthy inference of memory and scale dependence
    description: My PhD combines audited estimator benchmarks, conditional theory on inference limitations (the *Variance Trap*), and a proposed null-relative dependence field. The theory and dependence framework are in development.
    detail: 'University of Reading · 2025–present · Expected completion 2028'
projects:
  - name: lrdbench
    category: Research
    label: BENCHMARKING
    description: A reproducible framework for evaluating long-range dependence estimators on synthetic, contaminated, and observational time series, with explicit assumptions and uncertainty reporting.
    tags: [Python, Time series, Reproducibility]
    url: https://github.com/dave2k77/lrdbench
    links:
      - label: Documentation
        url: https://lrdbench.readthedocs.io
      - label: Software DOI
        url: https://doi.org/10.5281/zenodo.20937726
  - name: hpfracc
    category: Research
    label: FRACTIONAL COMPUTING · PRE-ALPHA
    description: Research-support software for fractional calculus and fractional dynamical systems, including JAX-native operators, Caputo solvers, and experimental differentiable workflows.
    tags: [Python, JAX, Fractional dynamics]
    url: https://github.com/dave2k77/hpfracc
    links:
      - label: Software DOI
        url: https://doi.org/10.5281/zenodo.20942679
  - name: Fourier PINO
    category: Research
    label: PHYSICS-INFORMED LEARNING
    description: A focused research implementation of a Fourier neural operator for the 2D heat equation, exploring the balance between data-driven and physics-informed training objectives.
    tags: [Python, PyTorch, PDEs]
    url: https://github.com/dave2k77/fourier_pino_model
    links: []
  - name: Computational mathematics
    category: Teaching
    label: OPEN TEACHING RESOURCES
    description: Mathematics lessons through Python and Jupyter notebooks, connecting functions, statistics, and mathematical reasoning with computational exploration.
    tags: [Python, Jupyter, Mathematics]
    url: https://github.com/dave2k77/comp_math
    links: []
  - name: Differentiable & probabilistic programming
    category: Teaching
    label: CURRICULUM & LABS
    description: A structured curriculum with learning outcomes, JAX and NumPyro labs, capstone projects, and assessment rubrics for scientific programming.
    tags: [JAX, NumPyro, Curriculum design]
    url: https://github.com/dave2k77/differentiable-probabilistic-programming-curriculum
    links: []
experience:
  - role: PhD Researcher
    organisation: University of Reading
    location: United Kingdom
    dates: 2025–present
    category: Research
    description: Computational neuroscience and scientific machine learning. Developing audited benchmarks, conditional inference theory, and methods for characterising dependence in stochastic dynamics.
  - role: Founder & Director
    organisation: Neuryte Learning Ltd
    location: United Kingdom
    dates: 2024–present
    category: Education & consultancy
    description: STEM education and AI consultancy, programme design, project delivery, and teaching across mathematics, science, computer science, and engineering.
  - role: Teacher of Computer Science
    organisation: Walton High
    location: Milton Keynes, UK
    dates: Oct 2023–Dec 2024
    category: Teaching
    description: Secondary computer science, computational thinking, and project-based learning for external examinations.
  - role: Teacher of Mathematics & Science
    organisation: The Bedford Academy
    location: Bedford, UK
    dates: Sep 2019–Aug 2023
    category: Teaching
    description: Application-led teaching supported by simulation and interactive visualisation, with a focus on engagement and progress for lower-attaining learners.
  - role: Mathematics Department Chair & Lead Teacher
    organisation: Shenzhen Vanke Meisha Academy
    location: China
    dates: Aug 2016–Jul 2019
    category: Leadership
    description: Built and led a multicultural mathematics department, contributed to school strategy, and researched computational thinking in mathematics education.
  - role: STEM / CLIL Mathematics Teacher & Instructional Designer
    organisation: Nazarbayev Intellectual Schools
    location: Kazakhstan
    dates: Aug 2014–Jul 2016
    category: Teaching & curriculum
    description: Cambridge Integrated Mathematics, teacher development, and interdisciplinary summer STEM programmes in biodiversity and rocket science.
  - role: A-Level Mathematics & Physics Teacher
    organisation: St Hugh’s High School
    location: Jamaica
    dates: Sep 2009–Aug 2014
    category: Teaching & coordination
    description: Curriculum and instruction for CSEC, CAPE, and A-Level courses; supervised mathematics projects and physics laboratory work.
  - role: Mathematics Teacher
    organisation: Gaynstead High School
    location: Jamaica
    dates: Jan–Aug 2009
    category: Teaching
    description: Mathematics instruction for students in Grades 10–11.
education:
  - degree: PhD, Biomedical Engineering
    institution: University of Reading
    dates: 2025–present · Expected 2028
    detail: Computational neuroscience; trustworthy inference of memory and scale dependence in stochastic dynamics.
  - degree: MSc, Computer Science
    institution: University of East London
    dates: '2023'
    detail: AI, machine learning, and big data technologies; physics-informed neural operators for heat and diffusion equations.
  - degree: MA, Education
    institution: University of South Wales
    dates: '2018'
    detail: Development, management, and technology; computational thinking as a framework for mathematics education.
  - degree: BSc, Mathematics & Computer Science
    institution: University of the West Indies
    dates: '2008'
    detail: Pure and applied mathematics, mathematical modelling, and operations research.
writing:
  - title: The repulsive nature of naked singularities from the point of view of Quantum Mechanics
    type: Journal article
    year: '2011'
    detail: D. Batic, D. Chin & M. Nowakowski · European Physical Journal C, 71, 1624
    url: https://doi.org/10.1140/epjc/s10052-011-1624-3
  - title: Trustworthy methods for scientific discovery in critical brain research
    type: Talk & poster
    year: '2026'
    detail: School of Biological Sciences ECR Symposium · University of Reading · July 2026
  - title: Fat-tail phenomena and long-memory processes in biological systems
    type: Conference poster
    year: '2025'
    detail: School of Biological Sciences & Biomedical Engineering Research Conference · University of Reading
  - title: LRD benchmarking, conditional inference limits & null-relative dependence
    type: Manuscripts in development
    year: Ongoing
    detail: Research on the corrected estimator benchmark, the conditional Variance Trap analysis, and a restricted dependence-field framework.
skills:
  - title: Scientific computing
    items: [Python, JAX, Equinox, NumPyro, PyTorch, NumPy / SciPy, pandas, scikit-learn]
  - title: Mathematics & modelling
    items: [Fractional calculus, Stochastic processes, Functional analysis, Wavelets, Bayesian inference, Time series]
  - title: Research & engineering
    items: [Git / GitHub, CI, Linux, Docker, LaTeX, Reproducible workflows, GPU computing]
  - title: Education & leadership
    items: [Curriculum design, Computational thinking, STEM programmes, Teacher development, Jupyter, Assessment design]
contact:
  heading: Let’s connect ideas.
  text: For research collaborations, scientific machine learning opportunities, or conversations about STEM education, get in touch.
# PDFs are compiled from the original LaTeX sources in the project root.
downloads:
  - label: Research CV · PDF
    url: cv/Davian_Chin_CV_Research.pdf
  - label: Teaching CV · PDF
    url: cv/Davian_Chin_CV_Teaching.pdf
---
I’m **Davian**, a mathematical scientist, scientific machine learning researcher, and educator based in the UK. My work sits at the intersection of **fractional calculus, stochastic dynamics, and computational neuroscience**.

At the University of Reading, I investigate how we can make trustworthy claims about memory and scale in finite time series. I build open research software to make the assumptions, methods, and evidence behind those claims easier to inspect and reproduce.

Alongside research, I bring more than 15 years of teaching and leadership experience across the UK, China, Kazakhstan, and Jamaica. From the classroom to scientific code, I’m interested in making complex ideas both rigorous and accessible.
