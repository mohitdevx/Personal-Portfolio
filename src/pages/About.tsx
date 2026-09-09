import Button from '../components/Button';

const About = () => {
  return (
    <section
      id="about"
      className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-20 font-poppins"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-light-main dark:text-main">
            Mohit Kumar
          </h1>
          <p className="mt-2 text-lg sm:text-xl font-medium text-light-muted dark:text-muted">
            Full Stack Developer
          </p>
        </div>

        <div className="space-y-5 text-base sm:text-lg text-light-muted dark:text-muted leading-relaxed">
          <p>
            I am a{' '}
            <span className="text-light-main dark:text-main font-medium">
              full stack developer
            </span>{' '}
            who enjoys building{' '}
            <span className="text-light-main dark:text-main font-medium">
              scalable and robust applications
            </span>
            . I work across the stack, creating dependable backends, clean APIs,
            and responsive frontends.
          </p>

          <p>
            Security is a core consideration in how I write code. I apply solid{' '}
            <span className="text-light-main dark:text-main font-medium">
              cybersecurity principles
            </span>{' '}
            throughout the development process to keep auth flows secure,
            protect data, and minimize vulnerabilities early on.
          </p>

          <p>
            I also handle everyday DevOps requirements with tools like{' '}
            <span className="text-light-main dark:text-main font-medium">
              Docker
            </span>
            , containerizing applications to ensure environments stay consistent
            from local development to deployment.
          </p>
        </div>

        {/* Social Links */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Button
            href="https://github.com/mohitdevx"
            icon="ri-github-line"
            endIcon="ri-arrow-right-up-line"
          >
            GitHub
          </Button>
          <Button
            href="https://linkedin.com/in/mohitdevx"
            icon="ri-linkedin-line"
            endIcon="ri-arrow-right-up-line"
          >
            LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;