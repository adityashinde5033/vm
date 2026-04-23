import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WaitlistForm from '@/components/WaitlistForm';
import HeroMarkers from '@/components/HeroMarkers';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './home.module.css';

const codeSample = [
  '<span class="tok-k">@Composable</span>',
  '<span class="tok-k">fun</span> <span class="tok-f">CheckoutScreen</span>(',
  '    viewModel: <span class="tok-t">CheckoutViewModel</span> = hiltViewModel(),',
  '    onDone: () -> <span class="tok-t">Unit</span>,',
  ') {',
  '    <span class="tok-k">val</span> cart <span class="tok-k">by</span> viewModel.cart.collectAsState()',
  '    <span class="tok-k">val</span> scope = rememberCoroutineScope()',
  '',
  '    <span class="tok-f">LazyColumn</span>(',
  '        modifier = <span class="tok-t">Modifier</span>.fillMaxSize().padding(<span class="tok-n">16</span>.dp),',
  '        verticalArrangement = <span class="tok-t">Arrangement</span>.spacedBy(<span class="tok-n">12</span>.dp),',
  '    ) {',
  '        <span class="tok-f">items</span>(cart.lines, key = { it.id }) { line ->',
  '            <span class="tok-f">CartRow</span>(line, onQty = viewModel::updateQty)',
  '        }',
  '        <span class="tok-f">item</span> {',
  '            <span class="tok-f">PrimaryButton</span>(<span class="tok-s">"Place order"</span>) {',
  '                scope.<span class="tok-f">launch</span> {',
  '                    viewModel.<span class="tok-f">placeOrder</span>()',
  '                    <span class="tok-f">onDone</span>()',
  '                }',
  '            }',
  '        }',
  '    }',
  '}',
  '',
  '<span class="tok-c">// ./gradlew ketoyBundle → checkout.ktx</span>',
  '<span class="tok-c">// Uploaded. Live in 60s.</span>',
].join('\n');

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.photo} />
          <div className={styles.mist} />
        </div>

        <div data-marker className={`${styles.marker} ${styles.m1}`}>N 47.3°</div>
        <div data-marker className={`${styles.marker} ${styles.m2}`}>E 152.4°</div>
        <div data-marker className={`${styles.marker} ${styles.m3}`}>KURIL ARC</div>
        <div data-marker className={`${styles.marker} ${styles.m4}`}>SEA · OKHOTSK</div>

        <div className={styles.heroTop}>
          <div className={styles.alphaBadge}>
            <span className={styles.alphaDot} />
            Alpha · Shipping to field testers
          </div>
          <div className={styles.coords}>
            LAT  47°20′N<br />
            LON  152°28′E<br />
            VOL. 1 · ED. 01
          </div>
        </div>

        <div className={styles.heroCenter}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            A Kotlin execution runtime for Android
          </div>
          <h1>
            Ship Kotlin.<br />
            <em>Rewrite</em> <span className={styles.ember}>anytime.</span>
          </h1>
          <p className={styles.heroSub}>
            KetoyVM executes plain Kotlin with full Jetpack Compose, coroutines, ViewModels, Hilt, Room, and Navigation inside a{' '}
            <span className="mono" style={{ color: 'var(--ember-2)' }}>.ktx</span> bundle. Push a new build to every device in 60 seconds. No Play Store round-trip. No DSL. No schema.
          </p>
          <div className={styles.heroCta}>
            <a href="#waitlist" className={`${styles.btn} ${styles.primary}`}>
              Join the waitlist <span className={styles.arrow}>→</span>
            </a>
            <a href="#how" className={styles.btn}>Read the spec</a>
          </div>
        </div>

        <div className={styles.heroFoot}>
          <div className={styles.footStat}>
            <span className={styles.k}>Runtime</span>
            <span className={styles.v}>KetoyVM <em className="serif" style={{ color: 'var(--moss-2)' }}>v0.4</em></span>
          </div>
          <div className={styles.footStat}>
            <span className={styles.k}>Bytecode</span>
            <span className={styles.v} style={{ fontFamily: 'var(--mono)', fontSize: 18 }}>KBC · .ktx</span>
          </div>
          <div className={styles.footStat}>
            <span className={styles.k}>Propagation</span>
            <span className={styles.v}>~60s <em className="serif" style={{ color: 'var(--ink-dim)' }}>to every device</em></span>
          </div>
          <div className={styles.footStat}>
            <span className={styles.k}>Origin</span>
            <span className={styles.v}>Ketoy <em className="serif" style={{ color: 'var(--moss-2)' }}>Island</em></span>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className={styles.marquee} aria-hidden="true" data-reveal="marquee">
        <div className={styles.marqueeTrack}>
          <span>
            Compose <em>composables</em> <i className={styles.sep}>◆</i>
            Coroutines <em>suspending</em> <i className={styles.sep}>◆</i>
            ViewModels <em>lifecycles</em> <i className={styles.sep}>◆</i>
            Room <em>reactive</em> <i className={styles.sep}>◆</i>
            Hilt <em>injected</em> <i className={styles.sep}>◆</i>
            Navigation <em>controllers</em> <i className={styles.sep}>◆</i>
            Retrofit <em>APIs</em> <i className={styles.sep}>◆</i>
          </span>
          <span>
            Compose <em>composables</em> <i className={styles.sep}>◆</i>
            Coroutines <em>suspending</em> <i className={styles.sep}>◆</i>
            ViewModels <em>lifecycles</em> <i className={styles.sep}>◆</i>
            Room <em>reactive</em> <i className={styles.sep}>◆</i>
            Hilt <em>injected</em> <i className={styles.sep}>◆</i>
            Navigation <em>controllers</em> <i className={styles.sep}>◆</i>
            Retrofit <em>APIs</em> <i className={styles.sep}>◆</i>
          </span>
        </div>
      </div>

      {/* HOW */}
      <section id="how" className={styles.section}>
        <div className={styles.sectionHead} data-reveal="section-head">
          <div className={styles.label}>
            <span className={styles.num}>01 / 04</span>
            <span className="mono">THE FLOW</span>
          </div>
          <h2>Write Kotlin. Run <em>./gradlew ketoyBundle</em>. Ship.</h2>
          <p className={styles.lede}>
            Four steps from your IDE to every user&apos;s phone. No app-store review. No binary split. No workaround DSL. The exact Kotlin you already write compiles to Ketoy Bytecode and executes inside the runtime on device.
          </p>
        </div>

        <div className={styles.flow}>
          <div className={styles.flowStep} data-reveal="flow-step">
            <div className={styles.idx}>STEP 01</div>
            <h3>Author</h3>
            <p>Write <span className="mono">CheckoutScreen.kt</span> with a LazyColumn, a ViewModel, Retrofit calls, and Hilt repositories. Exactly the Kotlin you&apos;d write today.</p>
            <div className={styles.glyph}>→ CheckoutScreen.kt</div>
          </div>
          <div className={styles.flowStep} data-reveal="flow-step">
            <div className={styles.idx}>STEP 02</div>
            <h3>Compile</h3>
            <p>The KetoyVM compiler plugin lowers your Kotlin to Ketoy Bytecode (<span className="mono">KBC</span>) server-side. Compose, coroutines, DI, all preserved.</p>
            <div className={styles.glyph}>→ ./gradlew ketoyBundle</div>
          </div>
          <div className={styles.flowStep} data-reveal="flow-step">
            <div className={styles.idx}>STEP 03</div>
            <h3>Publish</h3>
            <p>Upload <span className="mono">checkout.ktx</span> to Ketoy Cloud. Stage, canary, or ship to 100%. Version and rollback without a store release.</p>
            <div className={styles.glyph}>→ checkout.ktx · 142 KB</div>
          </div>
          <div className={styles.flowStep} data-reveal="flow-step">
            <div className={styles.idx}>STEP 04</div>
            <h3>Execute</h3>
            <p>The host app pulls the bundle. KetoyRuntime executes it natively with every Compose parameter, every coroutine scope, and every Room query in under 60s.</p>
            <div className={styles.glyph}>→ KetoyRuntime.load()</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionHead} data-reveal="section-head">
          <div className={styles.label}>
            <span className={styles.num}>02 / 04</span>
            <span className="mono">THE RUNTIME</span>
          </div>
          <h2>Everything you use. <em>Nothing</em> you&apos;d compromise.</h2>
          <p className={styles.lede}>
            KetoyVM is not a cross-platform abstraction. It is a Kotlin execution runtime. Components render natively through Jetpack Compose with every modifier, parameter, and animation, all with correct lifecycle semantics from end to end.
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.feat} data-reveal="feat">
            <div className={styles.featTag}>UI</div>
            <h4>Jetpack Compose, full surface</h4>
            <p>Every composable. Every modifier. Every parameter. Rendered natively by the platform, not re-implemented.</p>
            <div className={styles.sym}>NATIVE COMPOSE</div>
          </div>
          <div className={styles.feat} data-reveal="feat">
            <div className={styles.featTag}>Concurrency</div>
            <h4>Coroutines with correct semantics</h4>
            <p>Structured concurrency, cancellation, flows, channels. Suspending functions behave exactly as they do in a native build.</p>
            <div className={styles.sym}>COROUTINE · FLOW</div>
          </div>
          <div className={styles.feat} data-reveal="feat">
            <div className={styles.featTag}>State</div>
            <h4>ViewModels with real lifecycles</h4>
            <p>Scoped to the correct NavBackStackEntry. Survives configuration change. Clears on the correct signal. No shims.</p>
            <div className={styles.sym}>VIEWMODEL · LIFECYCLE</div>
          </div>
          <div className={styles.feat} data-reveal="feat">
            <div className={styles.featTag}>Data</div>
            <h4>Room with reactive queries included</h4>
            <p>Flow-returning DAOs, transactions, migrations. The runtime understands Room semantics and honors them.</p>
            <div className={styles.sym}>ROOM · FLOW&lt;T&gt;</div>
          </div>
          <div className={styles.feat} data-reveal="feat">
            <div className={styles.featTag}>DI</div>
            <h4>Hilt injection, at the edges</h4>
            <p>Inject repositories, clients, data sources into composables and ViewModels. Scoped, graph-resolved, real Hilt.</p>
            <div className={styles.sym}>HILT · @Inject</div>
          </div>
          <div className={styles.feat} data-reveal="feat">
            <div className={styles.featTag}>Navigation</div>
            <h4>NavController for every destination</h4>
            <p>Typed routes, deep links, back-stack, animated transitions. Your nav graph ships inside the bundle.</p>
            <div className={styles.sym}>NAV · BACKSTACK</div>
          </div>
        </div>
      </section>

      {/* CODE */}
      <section id="code" className={styles.section}>
        <div className={styles.sectionHead} data-reveal="section-head">
          <div className={styles.label}>
            <span className={styles.num}>03 / 04</span>
            <span className="mono">WHAT YOU WRITE</span>
          </div>
          <h2>The source stays <em>yours</em>. The delivery changes.</h2>
        </div>

        <div className={styles.codewrap}>
          <div className={styles.code} data-reveal="code">
            <div className={styles.codeHead}>
              <div className={styles.dots}>
                <i /><i /><i />
              </div>
              <div>CheckoutScreen.kt</div>
              <div>Kotlin · 142 lines</div>
            </div>
            <div className={styles.codeBody}>
              <pre dangerouslySetInnerHTML={{ __html: codeSample }} />
            </div>
          </div>

          <div className={styles.codeAside} data-reveal="code-aside">
            <div className="eyebrow">No DSL. No mapping. No schema.</div>
            <h3>The same Kotlin file ships <em>three ways</em>, and none of them require a rewrite.</h3>
            <p>A native build. A bundled <span className="mono">.ktx</span> delivered over the air. A staged canary to 2% of your users. The compiler does the work; your source tree is untouched.</p>
            <div className={styles.stream}>
              <span style={{ color: 'var(--ember-2)' }}>●</span>
              <span>Publishing checkout.ktx · v142</span>
              <div className={styles.bar} />
              <span>60s</span>
            </div>
            <div className={styles.stream}>
              <span style={{ color: 'var(--moss-2)' }}>●</span>
              <span>1,248,391 devices on v141 → v142</span>
              <div className={styles.bar} />
              <span>live</span>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section id="origin" className={styles.section}>
        <div className={styles.sectionHead} data-reveal="section-head">
          <div className={styles.label}>
            <span className={styles.num}>04 / 04</span>
            <span className="mono">THE NAME</span>
          </div>
          <h2>Named for an <em>uninhabited</em> volcano.</h2>
          <p className={styles.lede}>
            Kotlin is named for an island in the Gulf of Finland. We took the same road south-east, across the Sea of Okhotsk to the Kurils, and named the runtime for a volcanic island no one lives on. Unmapped terrain. Built for explorers.
          </p>
        </div>

        <div className={styles.origin}>
          <div className={styles.islandCard} data-reveal="island-card">
            <div className={styles.top}>
              <div className="eyebrow">THE ISLAND</div>
              <h3>Ketoy <em>Остров Кетой</em></h3>
              <p>Uninhabited. Volcanic. Central Kuril chain, Sea of Okhotsk. 73 km² of basalt and cloud forest, last erupted in living memory, inhabited only by sea birds and the occasional geologist.</p>
            </div>
            <svg className={styles.map} viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <radialGradient id="isle">
                  <stop offset="0" stopColor="#5a6d52" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#5a6d52" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g stroke="rgba(236,234,228,0.06)" strokeWidth="0.5">
                <line x1="0" y1="50" x2="200" y2="50" />
                <line x1="0" y1="100" x2="200" y2="100" />
                <line x1="0" y1="150" x2="200" y2="150" />
                <line x1="50" y1="0" x2="50" y2="200" />
                <line x1="100" y1="0" x2="100" y2="200" />
                <line x1="150" y1="0" x2="150" y2="200" />
              </g>
              <circle cx="100" cy="100" r="70" fill="url(#isle)" />
              <path
                d="M80,70 Q95,55 115,65 Q135,75 130,95 Q140,115 120,130 Q100,140 80,128 Q65,115 70,95 Q72,80 80,70 Z"
                fill="#0a0c0a"
                stroke="#8ea085"
                strokeWidth="0.8"
              />
              <circle cx="102" cy="98" r="3" fill="#d87138" />
              <circle cx="102" cy="98" r="6" fill="none" stroke="#d87138" strokeWidth="0.5" opacity="0.5" />
              <text x="110" y="100" fontFamily="JetBrains Mono" fontSize="7" fill="#eceae4">KETOY</text>
              <text x="20" y="190" fontFamily="JetBrains Mono" fontSize="6" fill="#5b5a54">47.3°N · 152.4°E</text>
            </svg>
            <div className={styles.bottom}>
              <div className={styles.coordBlock}>
                <div><b>LAT</b>   47° 20′ N</div>
                <div><b>LON</b>   152° 28′ E</div>
                <div><b>AREA</b>  73 km²</div>
                <div><b>PEAK</b>  1,172 m · Ketoy volcano</div>
                <div><b>POP</b>   0</div>
              </div>
            </div>
          </div>

          <div className={styles.islandCard} data-reveal="island-card">
            <div className={styles.top}>
              <div className="eyebrow">THE RUNTIME</div>
              <h3>KetoyVM <em>v0.4 · Alpha</em></h3>
              <p>A Kotlin program execution runtime for Android. Like Hermes to React Native&apos;s JavaScript, KetoyVM is built for Kotlin and Compose. Compiler plugin lowers your source to KBC. Host app loads the <span className="mono">.ktx</span> bundle. Runtime executes.</p>
            </div>
            <div className={styles.bottom}>
              <div className={styles.coordBlock}>
                <div><b>KIND</b>   Kotlin execution runtime · Android</div>
                <div><b>BC</b>     Ketoy Bytecode (KBC)</div>
                <div><b>PKG</b>    .ktx bundle</div>
                <div><b>RENDER</b> Native Jetpack Compose</div>
                <div><b>STAGE</b>  Alpha · by invitation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className="eyebrow" data-reveal="cta-child" style={{ marginBottom: 24 }}>
            JOIN THE ALPHA · COHORT 01
          </div>
          <h2 data-reveal="cta-child">
            The future of <em>Android</em><br />
            is your app, rewritten.
          </h2>
          <p data-reveal="cta-child">
            KetoyVM is in continuous alpha. If over-the-air Kotlin, Compose from a bundle, and 60-second deploys interest you, we&apos;re opening the next cohort by invitation.
          </p>
          <div data-reveal="cta-child">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Footer variant="landing" />

      <HeroMarkers />
      <ScrollReveal />
    </>
  );
}
