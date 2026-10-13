import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { startSubwayName } from "../components/subway-name/subway-name";
import type { DocumentHead } from "@builder.io/qwik-city";

type Job = {
  company: string;
  parent?: string;
  role: string;
  dates: string;
  blurbs: string[];
};

const jobs: Job[] = [
  {
    company: "Uber",
    role: "Lead Software Engineer",
    dates: "2022 to present",
    blurbs: [
      "Started in Uber's global payments platform, expanding international payment method coverage and refining onboarding flows to drive growth across emerging markets.",
      "Currently leading development of internal operational tooling around maps experiences and core maps SDK development, architecting cross-platform frameworks that power map-based experiences for 100M+ daily active users across mobile and web.",
    ],
  },
  {
    company: "Glassdoor",
    role: "Senior Frontend Engineer",
    dates: "2019 to 2022",
    blurbs: [
      "Led development for Glassdoor’s content moderation and B2B platforms, decoupling legacy monolithic Java systems into scalable Node.js, React, and GraphQL microservices. Built job promotion system for B2B sales and the high-throughput tooling moderators use to work through 20M+ new reviews a year.",
    ],
  },
  {
    company: "The Onion",
    parent: "Gizmodo Media Group",
    role: "Senior Software Engineer",
    dates: "2017 to 2019",
    blurbs: [
      "Architected modernization strategy for the Kinja platform's frontend, serving millions of daily readers across The Onion, Gizmodo and its sister sites. Transitioned legacy Scala services to scalable Node.js microservices and React.",
    ],
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
      const showPlain = () => hero.value?.classList.add("plain");
      document.fonts
        .load('400 64px "Bree Serif"')
        .then(() => {
          if (disposed || !hero.value || !name.value || !canvas.value) return;
          stop = startSubwayName(canvas.value, hero.value, name.value);
          if (!stop) showPlain();
        })
        .catch(showPlain);
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
        <p class="descriptor">Software engineer building platforms used by millions.</p>
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
              <h2>
                {job.company}
                {job.parent && <small class="parent">({job.parent})</small>}
              </h2>
              <p class="meta">
                {job.role} · {job.dates}
              </p>
            </div>
            <div class="blurbs">
              {job.blurbs.map((text) => (
                <p class="blurb" key={text}>
                  {text}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <footer class="contact">
        <h2>Contact</h2>
        <a href="mailto:hi@bryce.io">hi@bryce.io</a>
        <a href="https://www.linkedin.com/in/brycedorn">LinkedIn</a>
        <a href="https://github.com/brycedorn">GitHub</a>
      </footer>
    </main>
  );
});

export const head: DocumentHead = {
  title: "bryce.io",
  meta: [
    {
      name: "description",
      content: "Bryce, software architect and engineering leader.",
    },
  ],
};
