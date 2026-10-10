import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { startEtchedName } from "../components/etched-name/etched-name";
import type { DocumentHead } from "@builder.io/qwik-city";

type Job = {
  company: string;
  role: string;
  dates: string;
  blurb: string;
};

const jobs: Job[] = [
  {
    company: "Uber",
    role: "Lead Software Engineer",
    dates: "2022 to present",
    blurb:
      "Scaled Uber's global payments platform, expanding international payment method coverage and refining onboarding flows to unlock user growth across key emerging markets. Now leading development of internal operational tooling around maps and core maps SDK development, architecting cross-platform frameworks that power map-based experiences for 100M+ daily active users.",
  },
  {
    company: "Glassdoor",
    role: "Senior Frontend Engineer",
    dates: "2019 to 2022",
    blurb:
      "Led development for Glassdoor’s content moderation and B2B platforms, decoupling legacy monolithic systems into scalable Node.js, React, and GraphQL microservices. Engineered high-throughput tools to optimize high-volume moderation workflows while mentoring junior developers to elevate code quality and team velocity.",
  },
  {
    company: "The Onion",
    role: "Senior Software Engineer",
    dates: "2017 to 2019",
    blurb:
      "Architected modernization strategy across the Kinja platform's frontend, transitioning legacy Scala services to scalable Node.js microservices and React to cut infrastructure overhead and improve velocity and maintainability.",
  },
];

export default component$(() => {
  const hero = useSignal<HTMLElement>();
  const name = useSignal<HTMLElement>();
  const canvas = useSignal<HTMLCanvasElement>();

  // Needs the real DOM and fonts; the page renders its plain text first.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup }) => {
      let stop: (() => void) | null = null;
      let disposed = false;
      document.fonts.load('400 64px "Suez One"').then(() => {
        if (disposed || !hero.value || !name.value || !canvas.value) return;
        stop = startEtchedName(canvas.value, hero.value, name.value);
        if (stop) hero.value.classList.add("etched");
      });
      cleanup(() => {
        disposed = true;
        stop?.();
      });
    },
    { strategy: "document-ready" },
  );

  return (
    <main class="container page">
      <section ref={hero} class="hero">
        <canvas ref={canvas} class="etched-canvas" aria-hidden="true" />
        <h1 ref={name} class="name">
          bryce
        </h1>
        <p class="descriptor">Software architect and engineering leader.</p>
      </section>

      <ol class="entries" aria-label="Experience">
        {jobs.map((job, i) => (
          <li
            class="entry"
            key={job.company}
            data-rank={i + 1}
            style={{ "--i": i }}
          >
            <div>
              <h2>{job.company}</h2>
              <p class="meta">
                {job.role} · {job.dates}
              </p>
            </div>
            <p class="blurb">{job.blurb}</p>
          </li>
        ))}
      </ol>

      <footer class="contact">
        <h2>Contact</h2>
        <a href="mailto:hello@bryce.io">hello@bryce.io</a>
        <a href="https://www.linkedin.com/in/brycedorn">LinkedIn</a>
        <a href="https://github.com/brycedorn">GitHub</a>
      </footer>
    </main>
  );
});

export const head: DocumentHead = {
  title: "bryce",
  meta: [
    {
      name: "description",
      content: "Bryce, software architect and engineering leader.",
    },
  ],
};
