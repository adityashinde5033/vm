import type { AdjacentBlog, Blog, BlogSummary } from './types';
import { KETOYVM_VERSION, KETOYVM_VERSION_TAG } from './site';

const anya = {
  name: 'Anya Voronova',
  role: 'Compiler lead · KetoyVM',
  bio: 'Compiler lead at KetoyVM. Previously JetBrains, previously LLVM. Writes one Field Note a month, usually about IR.',
};

const kenji = {
  name: 'Kenji Park',
  role: 'Runtime engineer · KetoyVM',
  bio: 'Runtime engineer. Spends most weeks deleting code that the verifier no longer needs.',
};

const isabel = {
  name: 'Isabel Moreau',
  role: 'Concurrency · KetoyVM',
  bio: 'Works on coroutines, structured concurrency, and the bundle boundary.',
};

const devrel = {
  name: 'Dev Relations',
  role: 'KetoyVM',
  bio: 'Writes about what happens when alpha partners meet production traffic.',
};

const aditya = {
  name: 'Aditya',
  role: 'Founder · Ketoy',
  bio: 'Writes about the big picture of what KetoyVM does to teams and products.',
  avatar: '/team/aditya%20Small.jpeg',
};

/**
 * The single source of truth for blog content.
 * Each entry contains both summary fields (for the list page)
 * and a content block array (lazily imported for the detail page).
 */
export const blogs: Blog[] = [
  {
    id: '025',
    slug: 'introducing-ketoyvm',
    dispatch: 25,
    title: 'Android apps that can be <em>rewritten</em> anytime.',
    excerpt:
      'KetoyVM is a Kotlin runtime for Android. Write plain Compose, ViewModels, and Navigation. Hilt and Room stay in the host app; KetoyVM exposes their functions for new features because updating them requires a Play Store release. Ship it to a CDN. Every user has the new feature in 60 seconds.',
    dek:
      'KetoyVM is a Kotlin runtime for Android. Write plain Compose, ViewModels, and Navigation, the whole stack. Hilt and Room stay in the host app; KetoyVM exposes their functions for new features because updating them requires a Play Store release. Ship it to a CDN. Every user has the new feature within 60 seconds.',
    date: '2026-04-23',
    dateLabel: 'APR 23 · 2026',
    readingTime: '18 MIN',
    tags: ['Introducing', 'Runtime', 'KBC', 'Compose'],
    primaryTag: 'Introducing',
    author: aditya,
    featured: 'main',
    heroImage: {
      src: '/blogs/1/header.jpeg',
      caption: 'FIG 00 · INTRODUCING KETOYVM · APR 23 2026',
    },
    content: [
      {
        type: 'lede',
        html:
          'Today we are introducing KetoyVM, a Kotlin program execution runtime for Android. You write the same Jetpack Compose you write today, full composables, full ViewModels, Hilt and Room functions exposed by the host app (updates still require a Play Store release), NavController navigation, coroutines and Flow, and you ship it as a binary bundle from your server. Your host app downloads a <code>.ktx</code> file and the KetoyVM runtime executes it natively inside your app. Real Compose. Real structured concurrency. Real Room queries. Real navigation. Nothing is translated. Nothing is simulated.',
      },
      {
        type: 'pull',
        quote: 'The app is the operating system. The server ships programs. Kotlin is the language. KBC is the binary.',
      },
      {
        type: 'paragraph',
        html: 'This is our first post, so we want to use it to explain exactly what we built, how it works, and what it changes for Android teams.',
      },

      { type: 'heading', level: 2, num: '§ 01', html: 'What KetoyVM is' },
      {
        type: 'paragraph',
        html:
          'KetoyVM is three things working together: a Kotlin compiler plugin, a compact bytecode format called <strong>KBC</strong>, and an on-device runtime that executes it. You install the Gradle plugin in your feature module. You write Kotlin the way you always do. You run <code>./gradlew ketoyBundle</code>. You get a <code>.ktx</code> file. You upload it to your CDN. Every device running your host app fetches the new version the next time the user opens that screen.',
      },
      {
        type: 'paragraph',
        html:
          'The important thing to understand is that this is not a UI templating system. The whole Kotlin/Android stack you rely on is inside the bundle. A screen is not a tree of components, it is a program. It has state. It has a ViewModel. It injects a repository through host-exposed Hilt functions. It calls a Retrofit API and observes a Room <code>Flow</code> exposed by the host app. Hilt and Room themselves are not updated over the air because updating them requires a Play Store release. It navigates to another screen. It uses <code>LaunchedEffect</code>, <code>remember</code>, <code>derivedStateOf</code>, <code>rememberSaveable</code>. All of that ships in the bundle. All of that runs on the device.',
      },
      {
        type: 'paragraph',
        html: 'Here is a working sign-in screen, exactly as you would write it in a native Compose project:',
      },
      {
        type: 'code',
        filename: 'SignInScreen.kt',
        lang: 'Kotlin',
        html:
          '<span class="tok-k">@KetoyEntryPoint</span>\n' +
          '<span class="tok-k">@Composable</span>\n' +
          '<span class="tok-k">fun</span> <span class="tok-f">SignInScreen</span>(nav: <span class="tok-t">NavController</span>) {\n' +
          '    <span class="tok-k">val</span> vm    = <span class="tok-f">ketoyViewModel</span>&lt;<span class="tok-t">SignInViewModel</span>&gt;()\n' +
          '    <span class="tok-k">val</span> state <span class="tok-k">by</span> vm.state.<span class="tok-f">collectAsState</span>()\n' +
          '\n' +
          '    <span class="tok-f">Column</span>(\n' +
          '        modifier            = <span class="tok-t">Modifier</span>.<span class="tok-f">fillMaxSize</span>().<span class="tok-f">padding</span>(<span class="tok-n">24</span>.dp),\n' +
          '        verticalArrangement = <span class="tok-t">Arrangement</span>.Center,\n' +
          '        horizontalAlignment = <span class="tok-t">Alignment</span>.CenterHorizontally,\n' +
          '    ) {\n' +
          '        <span class="tok-f">Text</span>(<span class="tok-s">"Sign In"</span>, style = <span class="tok-t">MaterialTheme</span>.typography.headlineLarge)\n' +
          '        <span class="tok-f">Spacer</span>(<span class="tok-t">Modifier</span>.<span class="tok-f">height</span>(<span class="tok-n">32</span>.dp))\n' +
          '\n' +
          '        <span class="tok-f">OutlinedTextField</span>(\n' +
          '            value         = state.email,\n' +
          '            onValueChange = { vm.<span class="tok-f">onEmailChanged</span>(it) },\n' +
          '            label         = { <span class="tok-f">Text</span>(<span class="tok-s">"Email"</span>) },\n' +
          '            keyboardOptions = <span class="tok-f">KeyboardOptions</span>(\n' +
          '                keyboardType = <span class="tok-t">KeyboardType</span>.Email,\n' +
          '                imeAction    = <span class="tok-t">ImeAction</span>.Next,\n' +
          '            ),\n' +
          '            shape = <span class="tok-f">RoundedCornerShape</span>(<span class="tok-n">12</span>.dp),\n' +
          '        )\n' +
          '\n' +
          '        <span class="tok-f">Button</span>(\n' +
          '            onClick  = { vm.<span class="tok-f">signIn</span>(onSuccess = { nav.<span class="tok-f">navigate</span>(<span class="tok-s">"home"</span>) }) },\n' +
          '            enabled  = !state.isLoading,\n' +
          '            modifier = <span class="tok-t">Modifier</span>.<span class="tok-f">fillMaxWidth</span>().<span class="tok-f">height</span>(<span class="tok-n">52</span>.dp),\n' +
          '        ) {\n' +
          '            <span class="tok-k">if</span> (state.isLoading) <span class="tok-f">CircularProgressIndicator</span>(<span class="tok-t">Modifier</span>.<span class="tok-f">size</span>(<span class="tok-n">24</span>.dp))\n' +
          '            <span class="tok-k">else</span> <span class="tok-f">Text</span>(<span class="tok-s">"Sign In"</span>)\n' +
          '        }\n' +
          '    }\n' +
          '}\n' +
          '\n' +
          '<span class="tok-k">@HiltViewModel</span>\n' +
          '<span class="tok-k">class</span> <span class="tok-t">SignInViewModel</span> <span class="tok-k">@Inject constructor</span>(\n' +
          '    <span class="tok-k">private val</span> authRepo: <span class="tok-t">AuthRepository</span>,\n' +
          '    <span class="tok-k">private val</span> userDao:  <span class="tok-t">UserDao</span>,\n' +
          ') : <span class="tok-t">ViewModel</span>() {\n' +
          '\n' +
          '    <span class="tok-k">val</span> state = userDao.<span class="tok-f">observeCurrent</span>()\n' +
          '        .<span class="tok-f">map</span> { <span class="tok-t">UiState</span>(email = it?.email ?: <span class="tok-s">""</span>) }\n' +
          '        .<span class="tok-f">stateIn</span>(viewModelScope, <span class="tok-t">SharingStarted</span>.Lazily, <span class="tok-t">UiState</span>())\n' +
          '\n' +
          '    <span class="tok-k">fun</span> <span class="tok-f">signIn</span>(onSuccess: () -&gt; <span class="tok-t">Unit</span>) = viewModelScope.<span class="tok-f">launch</span> {\n' +
          '        authRepo.<span class="tok-f">signIn</span>(state.value.email, state.value.password)\n' +
          '            .<span class="tok-f">onSuccess</span> { onSuccess() }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'paragraph',
        html:
          "There is nothing KetoyVM-specific in that code except the <code>@KetoyEntryPoint</code> annotation that marks which composable is the bundle's entry. The <code>@HiltViewModel</code> still uses the host app's Hilt graph. <code>userDao.observeCurrent()</code> returns a real <code>Flow&lt;User?&gt;</code> from the host app's Room. KetoyVM does not update Hilt or Room; it exposes their functions for new features because updating them requires a Play Store release. <code>viewModelScope.launch</code> is real structured concurrency. <code>nav.navigate(\"home\")</code> is a real NavController call. The developer does not learn a new framework. The developer writes Android.",
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 02',
        html: 'Everything a real feature needs, shipped in the bundle',
      },
      {
        type: 'paragraph',
        html:
          'The point of KetoyVM is not "UI on the server." It is "features on the server." A feature in a modern Android app is a vertical slice: presentation, state, dependency graph, data, side effects, navigation. If any one of those pieces cannot be delivered over the air, the whole thing has to go through a Play Store release, and the exercise is meaningless. KetoyVM delivers the whole slice. Here is what comes through the bundle:',
      },
      {
        type: 'capabilities',
        items: [
          {
            name: 'Jetpack Compose',
            html: 'Every composable, every parameter, every modifier. All 17 parameters of <code>Text</code>, all 22 of <code>TextField</code>. Real slot table, real recomposition, real Skia.',
          },
          {
            name: 'ViewModel',
            html: '<code>KetoyVirtualViewModel</code> hosts your logic. <code>SavedStateHandle</code> persistence. <code>onCleared</code> cancels coroutines. Config-change survival is built in.',
          },
          {
            name: 'Hilt',
            html: "Host app exposes a <code>KetoyCapabilityProvider</code>. Your bundle's <code>@HiltViewModel</code> classes get repositories, services, and DAOs injected exactly as they would natively. Hilt stays in the host app; KetoyVM does not update Hilt because updates require a Play Store release.",
          },
          {
            name: 'Room',
            html: 'DAO methods exposed as Flow capabilities. A <code>Flow&lt;List&lt;User&gt;&gt;</code> crosses into KBC as a real <code>Flow</code> and connects to Compose via <code>collectAsState</code>. Room stays in the host app; KetoyVM does not update Room because updates require a Play Store release.',
          },
          {
            name: 'Coroutines & Flow',
            html: 'First-class opcodes: <code>SUSPEND_POINT</code>, <code>FLOW_COLLECT</code>, <code>WITH_CONTEXT</code>. Structured concurrency with real parent/child cancellation. <code>Dispatchers.IO</code> and friends.',
          },
          {
            name: 'Navigation',
            html: 'NavController as a capability. Push, pop, replace, deep-link, modal. A bundle can navigate to another bundle, which loads on demand.',
          },
          {
            name: 'Network',
            html: 'HTTP, WebSocket, SSE through host-app capabilities. Use your existing OkHttp/Retrofit stack. Auth headers and interceptors are inherited automatically.',
          },
          {
            name: 'Platform',
            html: 'Analytics, permissions, clipboard, haptics, deep links, DataStore. Each is a registered capability; the bundle cannot reach raw Android APIs, only what you expose.',
          },
        ],
      },
      {
        type: 'paragraph',
        html:
          'This is why we keep saying <em>programs</em> instead of <em>layouts</em>. When you ship a KetoyVM bundle, you are not patching the UI and leaving the logic stuck at the last Play Store version. You are replacing the feature end-to-end. A new onboarding flow. A new ViewModel with a new signup path. A new host-exposed dependency. A change to the host-exposed Room query that drives the home screen. Hilt and Room stay in the host app; KetoyVM exposes their functions for new features because updating them requires a Play Store release. All of it in one file.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 03',
        html: 'What the build pipeline actually does',
      },
      {
        type: 'paragraph',
        html:
          'When you run <code>./gradlew ketoyBundle</code>, here is what happens. Our Kotlin compiler plugin hooks into the K2 IR phase and lowers your Compose IR into KBC, a register-based bytecode built for this specific purpose. Register-based because that is what DEX is, and because register-based VMs issue roughly 30% fewer instructions than stack-based ones, the same decision ART made, for the same reason.',
      },
      {
        type: 'paragraph',
        html:
          "KBC has opcodes that speak Kotlin natively: <code>SUSPEND_POINT</code>, <code>RESUME_VALUE</code>, <code>FLOW_COLLECT</code>, <code>COMPOSE_REMEMBER</code>, <code>LAUNCHED_EFFECT</code>, <code>COLLECT_AS_STATE</code>. And two more that do the heavy lifting for Compose interop: <code>COMPOSABLE_CALL</code>, which invokes a composable via a KSP-generated adapter, and <code>CONSTRUCT_JVM</code>, which builds real Compose objects like <code>TextStyle</code>, <code>KeyboardOptions</code>, and <code>Shape</code> into runtime registers. The adapters are auto-generated against the Compose and Material3 classpath, which is how we cover <strong>every parameter of every component</strong>, including the ones that shipped in last week's Material3 release, without maintaining a component registry by hand.",
      },
      {
        type: 'paragraph',
        html:
          'The bundle is Brotli-compressed, signed with Ed25519, and carries a manifest of every adapter, constructor, and capability it references. At load time the runtime verifies the signature, checks that every referenced adapter and capability exists on this device, and only then begins execution. If anything is missing, you get a single <code>KetoyMissingAdapterException</code> with the list of missing IDs, fail-fast, before a single line of KBC runs.',
      },
      {
        type: 'paragraph',
        html:
          'On-device, for hot functions, a tiered JIT generates DEX locally from KBC. This is the same thing ART does constantly, and it is explicitly legal under Play Store policy because the DEX is generated on the device, not downloaded from a server. We never ship executable code. We ship Kotlin programs.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 04',
        html: 'The numbers we engineered this to hit',
      },
      {
        type: 'paragraph',
        html:
          "These are the performance targets KetoyVM's architecture is designed to meet. They are architectural commitments, wired into the repo as CI benchmarks, not press-release numbers. Every PR that regresses one has to justify it:",
      },
      {
        type: 'metrics',
        items: [
          { key: 'Bundle load + parse + verify', value: '< 50', unit: 'ms', sub: '50 KB <code>.ktx</code>, Ed25519 verified, adapter manifest checked.' },
          { key: 'First frame', value: '< 100', unit: 'ms', sub: 'From bundle ready to first Compose draw.' },
          { key: 'Interpreter throughput', value: '> 50M', unit: 'ops/sec', sub: 'Register-based dispatch on a mid-range device.' },
          { key: 'Composable call overhead', value: '< 0.5', unit: 'ms', sub: 'VM → adapter → real composable.' },
          { key: 'Bundle size vs equivalent JSON', value: '20×', unit: ' smaller', sub: 'Brotli-compressed KBC for the same screen.' },
          { key: 'Memory per active screen', value: '< 5', unit: 'MB', sub: 'Registers, coroutine state, adapter cache.' },
          { key: 'Tier-1 JIT speedup', value: '2×', unit: ' on hot paths', sub: 'On-device DEX from KBC for hot functions.' },
          { key: 'Default parameter cost', value: '0', unit: ' bytes', sub: 'Unspecified params are not encoded. Real Compose defaults apply at render time.' },
        ],
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 05',
        html: 'What this does to a sprint',
      },
      {
        type: 'paragraph',
        html:
          'Everything above is infrastructure. Here is what the infrastructure is in service of. If you are a tech lead or engineering manager, this is the section that matters, because it changes the arithmetic of how your team plans work.',
      },
      {
        type: 'paragraph',
        html:
          'Think about your last twelve months. How many updates did your Android team ship? For a moderately active consumer or SaaS app, twenty is a reasonable estimate, roughly one meaningful release every two to three weeks, counting minor and mid-size features. Now look at where the time actually went:',
      },
      {
        type: 'math',
        rows: [
          { label: 'Updates shipped in the year', val: '20' },
          { label: 'Play Store review, per update', val: '1–3 days' },
          { label: 'Staged rollout (5% → 20% → 50% → 100%)', val: '3–7 days' },
          { label: 'Tail of users on old versions', val: 'weeks' },
          { label: 'Calendar days waiting on Google, per update', val: '~4–10 days', variant: 'hr' },
          { label: 'Waiting, per year', val: '~80–200 days', variant: 'total' },
        ],
        note:
          'That is not engineering time. That is the time between <em>we are done</em> and <em>users have it</em>. With KetoyVM, that number falls to the time your CDN edge takes to warm, measured in seconds.',
      },
      {
        type: 'paragraph',
        html:
          'And this math only counts the formal wait. It does not count the quieter tax: the features that never get shipped because they are not big enough to justify taking up a release slot, the copy fixes a PM asked for three weeks ago that are still waiting for the next train, the onboarding tweak a designer wants to try that is not worth starting a staged rollout for. Every batching decision is a small deferral, and those deferrals compound.',
      },
      {
        type: 'paragraph',
        html:
          'The quieter consequence is what this does to your sprint cadence. When every merged feature sits in a review queue, teams batch. They combine a copy change, a small bug fix, a new onboarding step, and a checkout tweak into one release so the fixed review overhead amortizes across multiple units of work. Batching <em>feels</em> efficient but it is actually expensive: it delays small wins behind big ones, and it couples unrelated risks into one rollback decision. When you remove the queue, the batching goes away. Sprints stop being "what can we land in the next release train" and start being "what can we build, test, and ship this week." The grain of planning shrinks from sprints to afternoons.',
      },
      {
        type: 'paragraph',
        html:
          'The second-order effect is even better. Because shipping is cheap, <em>you ship more</em>. An experiment that would not have justified the fixed cost of a release now justifies a bundle upload. A copy change a PM has been asking about for three weeks goes out in ten minutes. A host-exposed Room query that is slow for power users gets patched on Tuesday instead of in the next release. Twenty updates a year becomes forty, then sixty, without adding engineers, because the engineers you already have stop waiting.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 06',
        html: 'What Android teams can do on day one',
      },
      {
        type: 'paragraph',
        html:
          'These are the concrete shifts teams see when they put their first screen on KetoyVM. None of them are theoretical, they are direct consequences of what the runtime does.',
      },

      { type: 'heading', level: 3, html: 'Ship features, not just UI, without a Play Store release' },
      {
        type: 'paragraph',
        html:
          "A KetoyVM bundle is a feature. If you change your ViewModel, the Hilt- or Room-backed calls exposed by the host app, your navigation flow, or your Compose tree, all of it goes out in the same <code>.ktx</code>. Hilt and Room themselves stay in the host app; KetoyVM exposes their functions for new features because updating them requires a Play Store release. The only thing you cannot change over the air is the host app's set of registered capabilities, the Android APIs the bundle is allowed to call, and in practice those stabilize early in a project and rarely change. Everything else ships from CDN.",
      },

      { type: 'heading', level: 3, html: 'Faster sprints, because "done" actually means "shipped"' },
      {
        type: 'paragraph',
        html:
          'The end of a sprint should be the end of the work, not the start of a ten-day wait for Google. When bundle upload is the last step, sprint demos become live rollouts. A bug caught in code review gets fixed and redeployed in the same afternoon. A design tweak that lands on a Wednesday reaches users on a Wednesday. Teams we have talked to describe this as <em>the first time mobile has felt like web</em>.',
      },

      { type: 'heading', level: 3, html: 'Rollback that is the same operation as roll-forward' },
      {
        type: 'paragraph',
        html:
          'A P0 in a native release is a four-day recovery. In KetoyVM, you re-point the bundle URL to the previous version. On the next fetch, users are on the good code. The bundle-verification guarantees (Ed25519 signature, adapter manifest, capability manifest, fail-fast on anything missing) are the same going backwards as forwards, which means rolling back is as safe as rolling forward was. This alone rewrites your incident response playbook.',
      },

      { type: 'heading', level: 3, html: 'A/B test at the grain of a single screen' },
      {
        type: 'paragraph',
        html:
          'A variant is a second <code>.ktx</code>. Route 10% of users to <code>checkout@v2.ktx</code> at the CDN edge, leave the rest on the current version, watch the funnel. No feature flag sprawl. No two code paths to maintain in the host app. When the winner is clear, promote the bundle and retire the other. The fixed cost of "running an experiment" collapses to "uploading a file," and teams that currently run three or four experiments a quarter can realistically run an order of magnitude more.',
      },

      { type: 'heading', level: 3, html: 'Personalize per user, not per segment' },
      {
        type: 'paragraph',
        html:
          'Serve different bundles to different users. Premium tier gets a richer checkout. First-time users get a guided flow. A specific cohort in a specific region gets a compliance-adjusted variant. The host app does not branch on any of this; it asks for the bundle for this user, on this screen, right now. Personalization moves out of client code, where it accumulates as tech debt and rarely gets removed, and into server-side policy you can observe, change, and retire cleanly.',
      },

      { type: 'heading', level: 3, html: 'User engagement that keeps up with your product thinking' },
      {
        type: 'paragraph',
        html:
          'Engagement on mobile dies in the gap between <em>we noticed something in the data</em> and <em>users see a change</em>. When that gap is weeks, the insight goes stale, the cohort has churned, the season has moved, the PM has three new theories. When that gap is an afternoon, engagement becomes a tight loop. You see a drop-off on step three of onboarding on Monday morning and you ship a fix that afternoon, watch the funnel on Tuesday, iterate Wednesday. That is the loop every web team has and no mobile team has. KetoyVM is the shortest honest path to closing it.',
      },

      { type: 'heading', level: 3, html: 'Keep your Android team an Android team' },
      {
        type: 'paragraph',
        html:
          'We held this one for last because it is the one most leads end up caring about most. Every other "dynamic delivery" path we have watched teams take ends with the engineering org splitting into two tiers: the people who write the shell app in Kotlin, and the people who write the "dynamic content" in JSON, Lua, JavaScript, or a homegrown DSL. Two stacks, two hiring pipelines, two sets of idioms, a quiet caste system. KetoyVM is the same language end-to-end. Your Android engineers stay Android engineers. Your CI stays Gradle. Your code review stays a Kotlin review. The operational burden of a dynamic-delivery system collapses into <em>another Gradle task</em>.',
      },

      {
        type: 'callout',
        tag: 'For the deck',
        html:
          'Every feature your team wanted to ship this quarter but could not justify the release overhead of is now a file you upload. Every bug you watched sit in staged rollout is now a re-deploy. Every experiment you did not run because it was not worth the release cost is now cheap. Over a year, that compounds into a different product.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 07',
        html: 'Where we are, and what is next',
      },
      {
        type: 'paragraph',
        html:
          'KetoyVM is being built in public. The compiler plugin, the VM, the KSP adapter generator, the bundle format, and the tooling are landing on GitHub as they stabilize. Every performance target above is in the repo as a CI benchmark. The architecture decision log, why register-based, why a custom bytecode instead of DEX, why KSP-generated adapters, why Ed25519, is committed next to the code. We are not running a closed beta. We are running a long, loud build.',
      },
      {
        type: 'paragraph',
        html:
          'If you lead an Android team that ships more than the release train wants to let you, if you have a PM who has been waiting two weeks on a three-line copy change, if you want to experiment more than your release cadence allows, we want to work with you. The earliest integrations will shape what the SDK looks like.',
      },
      {
        type: 'cta',
        title: 'Build on KetoyVM',
        html: 'Read the docs, clone the repo, or talk to us about integrating. The early-partner program is open.',
        buttons: [
          { label: 'Read the docs →', href: '#' },
          { label: 'GitHub', href: 'https://github.com/KetoyDev', variant: 'ghost' },
          { label: 'Join the early-partner program', href: '/#waitlist', variant: 'ghost' },
        ],
      },
      {
        type: 'signature',
        html: 'Thanks for reading the first one. There will be many.',
        name: 'Aditya',
        role: 'Head of Developer Relations · KetoyVM',
      },
    ],
  },
  {
    id: '024',
    slug: 'lowering-compose-to-kbc',
    dispatch: 24,
    title: 'Lowering Compose to <em>KBC</em>: how composables survive the trip.',
    excerpt:
      "Preserving the Compose compiler's invariants, slot tables, group keys and remember semantics inside a portable bytecode is harder than it looks.",
    dek:
      "Preserving the Compose compiler's invariants, slot tables, group keys and remember semantics inside a portable bytecode is harder than it looks. Here's what broke, what we kept, and what we'll never ship.",
    date: '2026-04-22',
    dateLabel: 'APR 22 · 2026',
    readingTime: '14 MIN',
    tags: ['Compiler', 'Compose', 'KBC'],
    primaryTag: 'Compiler',
    author: anya,
    heroImage: {
      src: '/assets/vol-img.png',
      caption: 'FIG 00 · KETOY ISLAND · APR 2026 · CLOUD COVER 40%',
    },
    content: [
      {
        type: 'lede',
        html:
          'The <strong>Compose compiler plugin</strong> is a small, strict set of rules on top of Kotlin. It rewrites <code>@Composable</code> functions into something that looks nothing like what you wrote: every call receives an implicit <code>$composer</code> parameter, every block gets a <em>group key</em>, every <code>remember</code> allocates a slot in a persistent <em>slot table</em>. The rules are load-bearing. Violate one of them and recomposition silently skips the wrong subtree.',
      },
      {
        type: 'paragraph',
        html:
          'When we started designing <strong>KBC</strong>, Ketoy Bytecode, the portable instruction set we ship inside every <code>.ktx</code> bundle, we had to decide, early, what layer of Compose we were going to serialize. Source? Kotlin IR, pre-Compose? Kotlin IR, post-Compose? JVM bytecode? Each option traded a different set of invariants.',
      },
      {
        type: 'paragraph',
        html:
          'This is the story of how we settled on <strong>post-Compose IR</strong>, why it was both obvious and a mistake, and the two months we spent fixing it.',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 01 — STARTING POINT',
        html: 'Four layers, none of them good',
      },
      { type: 'paragraph', html: 'Here is the part of the Kotlin toolchain we cared about, in order:' },
      {
        type: 'list',
        items: [
          "<strong>Source</strong> &mdash; the <code>.kt</code> files your engineers write.",
          "<strong>FIR</strong> &mdash; the frontend's resolved, type-checked tree.",
          '<strong>IR (pre-Compose)</strong> &mdash; the same program, lowered to Kotlin IR, but with <code>@Composable</code> still being a marker annotation.',
          '<strong>IR (post-Compose)</strong> &mdash; what the Compose plugin leaves behind: every composable rewritten, <code>$composer</code> threaded through, group keys inserted.',
        ],
      },
      {
        type: 'paragraph',
        html:
          'Serializing source was a non-starter, we do not want to ship a compiler frontend on every device. Serializing FIR means bringing in the entire resolution environment. Pre-Compose IR was appealing until we realized we would have to re-run the Compose plugin on device, which meant shipping <em>the Compose plugin itself</em> inside the runtime. Viable, but fragile: every Compose release becomes a runtime release.',
      },
      {
        type: 'paragraph',
        html: 'That left <strong>post-Compose IR</strong>. The rewrites are already done. We just need to faithfully serialize a tree we know how to execute.',
      },
      {
        type: 'pull',
        quote:
          'The trouble with using post-Compose IR is that we inherited every design choice the Compose plugin ever made, including the ones made assuming the JVM.',
        cite: 'The reason this post exists',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 02 — THE PIPELINE',
        html: 'From .kt to .ktx, end to end',
      },
      {
        type: 'diagram',
        nodes: [
          { n: '01', l: 'Source' },
          { n: '02', l: 'FIR' },
          { n: '03', l: 'IR pre' },
        ],
      },
      {
        type: 'diagram',
        nodes: [
          { n: '04', l: 'IR post-Compose' },
          { n: '05', l: 'KBC lowering' },
          { n: '06', l: '.ktx bundle' },
        ],
      },
      {
        type: 'paragraph',
        html:
          'Our work lives entirely in step 05 and is driven by a small Gradle plugin that attaches after the Compose plugin has run. The output is a binary KBC file, wrapped in a signed container with a manifest, a resource table, and a forward-compatibility header.',
      },
      { type: 'heading', level: 3, html: 'What KBC actually is' },
      {
        type: 'paragraph',
        html:
          "KBC is a <strong>register-based</strong>, strongly-typed instruction set. Every function carries an explicit register count; every instruction references registers by index. We considered stack bytecode (shorter opcodes, simpler verifier) and rejected it, too many memory roundtrips in Compose-heavy code, where functions have a dozen implicit parameters.",
      },
      {
        type: 'code',
        filename: 'Counter.ktx · disassembled',
        lang: 'KBC',
        html:
          '<span class="tok-c">; @Composable fun Counter(initial: Int = 0)</span>\n' +
          '<span class="tok-c">; regs = 8, implicit: $composer, $changed</span>\n' +
          '\n' +
          '<span class="tok-f">FN</span> <span class="tok-t">Counter</span>(<span class="tok-n">r0</span>: <span class="tok-t">Composer</span>, <span class="tok-n">r1</span>: <span class="tok-t">Int</span>, <span class="tok-n">r2</span>: <span class="tok-t">Int</span>, <span class="tok-n">r3</span>: <span class="tok-t">Int</span>) {\n' +
          '  <span class="tok-k">group.start</span>   <span class="tok-n">r0</span>, key=<span class="tok-n">0x7aef12</span>     <span class="tok-c">; composable group key</span>\n' +
          '  <span class="tok-k">slot.load</span>    <span class="tok-n">r4</span>, <span class="tok-n">r0</span>, slot=<span class="tok-n">0</span>       <span class="tok-c">; remember { mutableStateOf }</span>\n' +
          '  <span class="tok-k">invoke.virt</span>  <span class="tok-n">r5</span>, <span class="tok-n">r4</span>, <span class="tok-s">"getValue"</span>\n' +
          '  <span class="tok-k">call</span>         <span class="tok-t">Text</span>, <span class="tok-n">r0</span>, <span class="tok-n">r5</span>, <span class="tok-n">r3</span>      <span class="tok-c">; Text(count.toString())</span>\n' +
          '  <span class="tok-k">group.end</span>     <span class="tok-n">r0</span>\n' +
          '  <span class="tok-k">ret</span>\n' +
          '}',
      },
      {
        type: 'paragraph',
        html:
          'Two things are worth noting. First, every composable call takes the composer in <code>r0</code>, we made this the ABI, so verifier checks are cheap. Second, <code>group.start</code> and <code>group.end</code> are <em>first-class instructions</em>, not library calls. The verifier can statically prove every group is closed. That alone eliminates a class of bugs we used to only catch at runtime.',
      },
      {
        type: 'callout',
        tag: 'NOTE',
        html:
          '<strong>Group keys are stable across bundles.</strong> We derive them from a hash of the enclosing function\'s fully-qualified name plus the call\'s source position. Shipping a new bundle with an added composable at the top of a file does <em>not</em> renumber every key below it, which means recomposition state survives bundle updates.',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 03 — THE NUMBERS',
        html: 'Size, speed, verifier throughput',
      },
      {
        type: 'paragraph',
        html:
          'Here is where we landed after the rewrite. Baselines are measured on a Pixel 6, Android 15, one medium composable tree (the Monzo checkout flow, a representative bundle of 142 composables and 38 ViewModels).',
      },
      {
        type: 'table',
        caption: 'TABLE 01 · BENCHMARKS · PIXEL 6 · AOSP 15',
        captionNote: 'N = 1,000 RUNS',
        headers: ['Metric', 'JVM class files', 'KBC v0.3', `KBC ${KETOYVM_VERSION_TAG}`, 'Δ'],
        rows: [
          [{ text: 'Bundle size (gzip)' }, { text: '612 KB' }, { text: '284 KB' }, { text: '218 KB', numeric: true }, { text: '−64%', numeric: true }],
          [{ text: 'Parse + verify' }, { text: '168 ms' }, { text: '44 ms' }, { text: '21 ms', numeric: true }, { text: '−87%', numeric: true }],
          [{ text: 'Link time' }, { text: '91 ms' }, { text: '38 ms' }, { text: '18 ms', numeric: true }, { text: '−80%', numeric: true }],
          [{ text: 'First frame' }, { text: '910 ms' }, { text: '260 ms' }, { text: '142 ms', numeric: true }, { text: '−84%', numeric: true }],
          [{ text: 'Recomposition / frame' }, { text: '4.1 ms' }, { text: '2.2 ms' }, { text: '1.8 ms', numeric: true }, { text: '−56%', numeric: true }],
          [{ text: 'Steady-state memory' }, { text: '34 MB' }, { text: '22 MB' }, { text: '19 MB', numeric: true }, { text: '−44%', numeric: true }],
        ],
      },
      {
        type: 'paragraph',
        html:
          "The size win is unsurprising: JVM class files are designed for an environment we are not in. The parse+verify win is more interesting, our verifier is 4× faster than ART's not because we are cleverer, but because we designed our verifier and our instruction set together. Every invariant we need to check is expressible as a single forward pass.",
      },
      { type: 'heading', level: 3, html: 'The one we are least proud of' },
      {
        type: 'paragraph',
        html:
          'Recomposition time is still <strong>1.8 ms per frame</strong> in the worst case we measure, which is fine, but we have not closed the gap with a native build (about 1.4 ms on the same device). Most of the overhead is in the slot-table implementation, which we wrote in plain Kotlin and have not yet JIT-compiled. That is the job for v0.5.',
      },
      {
        type: 'figure',
        src: '/assets/vol-img.png',
        alt: 'Flame graph visualization',
        captionBold: 'FIG 02',
        caption: 'Flame graph of one recompose frame · 142 composables · Pixel 6 · APR 2026',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 04 — WHAT BROKE',
        html: 'Three invariants we nearly lost',
      },
      {
        type: 'paragraph',
        html:
          'Three Compose invariants caused us real trouble. I will list them, what we shipped, and, for one of them, what we still owe you.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          '<strong>Stability inference.</strong> The Compose plugin decides, at compile time, which parameters are <em>stable</em> and therefore skippable. We ship those annotations in KBC metadata. We do <em>not</em> re-infer on device.',
          '<strong>Remember semantics.</strong> <code>remember { }</code> is a slot-table allocation keyed by enclosing group. Our slot table implementation must match the Compose runtime\'s layout byte-for-byte or recomposition breaks across updates. It does. We have a conformance test suite with 2,400 cases.',
          '<strong>Live edit &amp; hot reload.</strong> We do not support this yet. The Compose compiler has a live-edit mode that changes the slot-table layout slightly; we fail closed and require a full bundle swap. This is fine for production, painful in development. On the roadmap for v0.6.',
        ],
      },
      {
        type: 'callout',
        tag: 'KNOWN ISSUE',
        html:
          `If you import a library that uses <code>@NonRestartableComposable</code>, KetoyVM ${KETOYVM_VERSION} will correctly mark the function as non-restartable in metadata, but our optimizer does <em>not</em> yet honor the annotation during inlining. Tracked as <strong>KET-0412</strong>. Workaround: <code>-Xketoy-no-inline-nonrestartable</code>.`,
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 05 — WHAT WE WILL NEVER SHIP',
        html: 'The long list, shortened',
      },
      {
        type: 'paragraph',
        html: 'Every runtime is a stack of decisions about what to exclude. For KetoyVM, the list is long. A partial version:',
      },
      {
        type: 'list',
        items: [
          '<strong>No reflection.</strong> KBC has no <code>kotlin.reflect</code>. If you need a class name at runtime, declare it. The verifier enforces this and the bundle will not load if it slips through.',
          '<strong>No <code>java.lang.reflect</code> either.</strong> The bridge to host code goes through a typed, declared interface surface. You cannot reach across.',
          '<strong>No dynamic class loading from the bundle.</strong> The bundle is sealed at publish time. A bundle cannot load another bundle.',
          '<strong>No JNI.</strong> If you need native code, it lives in the host.',
        ],
      },
      {
        type: 'paragraph',
        html:
          'These are hard rules. They keep the attack surface small, the verifier fast, and the mental model clean. If you want a language runtime that does all of the above, you already have one, it is called the JVM, and your phone is already running it.',
      },
      { type: 'hr' },
      {
        type: 'paragraph',
        html:
          'The compiler is the hardest thing we will ever ship, and the least thing our users will ever see. If any of this was interesting, the KBC specification is on the changelog and there is an <a class="link" href="#">office hours session</a> next Thursday, I will be there, and so will the person who wrote the slot-table port.',
      },
      {
        type: 'signature',
        html: '— A.V. · from the island, Apr 22 2026',
      },
    ],
  },

  {
    id: '023',
    slug: 'cold-start-142ms',
    dispatch: 23,
    title: 'Cold-start is a <em>feature</em>: 142 ms to first frame on a Pixel 6.',
    excerpt:
      'Every millisecond we spent parsing, verifying, linking and JIT-warming the bundle, and how we cut the path from 910 ms to 142.',
    dek:
      'Cold-start was the line we could not cross. Here is the pass-by-pass account of how we got the runtime to first frame in 142 milliseconds.',
    date: '2026-04-18',
    dateLabel: 'APR 18 · 2026',
    readingTime: '9 MIN',
    tags: ['Runtime', 'Performance'],
    primaryTag: 'Runtime',
    author: kenji,
    featured: 'side',
    heroImage: { src: '/assets/vol-img.png', caption: 'FIG 00 · KETOY FIELD · 142 MS' },
    content: [
      {
        type: 'lede',
        html:
          'For a year, <strong>cold-start</strong> was the number that kept us honest. Every other benchmark could be tuned in isolation. Cold-start collapsed the whole runtime into one observable.',
      },
      {
        type: 'paragraph',
        html:
          'We measured the path from <code>KetoyRuntime.load()</code> to the first recomposition finishing. No network. Local bundle, cached on disk. A 142-composable tree. Pixel 6, AOSP 15. This post is an accounting of how that number moved.',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 01 — BASELINE',
        html: '910 ms, mostly in verification',
      },
      {
        type: 'paragraph',
        html:
          'Our first honest measurement was 910 ms. The bulk of it was verifier overhead. We were running an over-general dataflow pass because we had inherited JVM-style invariants that KBC had already retired.',
      },
      {
        type: 'pull',
        quote: 'The fastest verifier is the one that proves the fewest theorems.',
        cite: 'Pinned above the runtime team desk',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 02 — THE WINS',
        html: 'What actually moved the number',
      },
      {
        type: 'list',
        items: [
          '<strong>Merged parse + verify.</strong> We walk the section table once. 168 ms &rarr; 21 ms.',
          '<strong>Hoisted constant pools out of per-function tables.</strong> Link time dropped to 18 ms.',
          "<strong>Lazy slot-table allocation.</strong> We don't allocate until the composable actually runs; first frame stopped paying for scopes it never enters.",
          '<strong>Compose stability metadata in the header.</strong> We can skip entire subtrees during first recomposition.',
        ],
      },
      {
        type: 'callout',
        tag: 'NOTE',
        html:
          'The single largest win was moving verification out of the critical path. It now runs in parallel with disk read for the next section, so by the time we are ready to link, verification is done.',
      },
      {
        type: 'paragraph',
        html:
          'That took us to 142 ms. On a cold device cache, with no tricks. The floor, we think, is somewhere near 90 ms, bounded by IO and the native Compose layout pass. We are not there yet.',
      },
      { type: 'hr' },
      {
        type: 'signature',
        html: '— K.P. · Runtime, Apr 18 2026',
      },
    ],
  },

  {
    id: '022',
    slug: 'structured-concurrency-bundle-boundary',
    dispatch: 22,
    title: 'Structured concurrency across the <em>bundle boundary</em>.',
    excerpt:
      "A coroutine started inside a .ktx bundle has to honor the host's lifecycle. Getting cancellation right cost us a quarter.",
    date: '2026-04-11',
    dateLabel: 'APR 11 · 2026',
    readingTime: '11 MIN',
    tags: ['Coroutines', 'Runtime'],
    primaryTag: 'Coroutines',
    author: isabel,
    featured: 'side',
    heroImage: { src: '/assets/vol-img.png' },
    content: [
      {
        type: 'lede',
        html:
          "A coroutine started inside a bundle must honor the <strong>host</strong>'s lifecycle. That sentence hides a quarter of engineering.",
      },
      {
        type: 'paragraph',
        html:
          'The obvious model is to give the bundle its own <code>CoroutineScope</code>, rooted in the host <code>viewModelScope</code> or equivalent. The obvious model is also wrong: cancellation propagates the opposite direction across the seam, and the bundle cannot see the host\'s <em>Job</em> to install a handler on it.',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 01 — TWO JOBS, ONE HIERARCHY',
        html: 'How we bridge the boundary',
      },
      {
        type: 'paragraph',
        html:
          'The runtime exposes a single <code>BundleScope</code> that wraps two <code>Job</code>s: a host-side root and a bundle-side local. The host root cancels the bundle job; bundle work never leaks upward. Cancellation is idempotent and immediate.',
      },
      {
        type: 'callout',
        tag: 'PITFALL',
        html:
          'If you ever see a coroutine outliving its host, check that the bundle was unloaded through <code>KetoyRuntime.unload()</code> and not via a bare reference drop. We documented this loudly, but it bites people.',
      },
      {
        type: 'signature',
        html: '— I.M. · Concurrency, Apr 11 2026',
      },
    ],
  },

  {
    id: '021',
    slug: 'monzo-alpha-three-weeks',
    dispatch: 21,
    title: 'Three weeks with Monzo Labs on the <em>alpha</em>.',
    excerpt: "What shipping a live-updated checkout flow to 2% of production looks like from the other side of the table.",
    date: '2026-04-04',
    dateLabel: 'APR 04 · 2026',
    readingTime: '7 MIN',
    tags: ['Field Report'],
    primaryTag: 'Field Report',
    author: devrel,
    featured: 'side',
    content: [
      {
        type: 'lede',
        html:
          "Monzo Labs shipped a KetoyVM bundle to 2% of production for three weeks. Here is what we learned, <em>together</em>, about what alpha means.",
      },
      {
        type: 'paragraph',
        html:
          `The flow was a new checkout screen. The bundle was 184 KB. It ran for 21 days, received four updates, and reverted once. No crashes attributable to the runtime. One performance regression we fixed in ${KETOYVM_VERSION_TAG}.`,
      },
      {
        type: 'callout',
        tag: 'WHAT WORKED',
        html: 'The loop from commit to production in under ten minutes. The team pushed four iterations during the field period, each one going live without a store release.',
      },
      { type: 'signature', html: '— Dev Relations, Apr 04 2026' },
    ],
  },

  {
    id: '020',
    slug: 'ktx-bundle-tour',
    dispatch: 20,
    title: 'A tour of the <em>.ktx bundle</em>: sections, manifests, signatures.',
    excerpt: "The file format your app will download at 3am. What's in it, why it's laid out the way it is, and what we'll promise is stable.",
    date: '2026-03-27',
    dateLabel: 'MAR 27 · 2026',
    readingTime: '12 MIN',
    tags: ['Compiler', 'Spec'],
    primaryTag: 'Compiler',
    author: anya,
    content: [
      {
        type: 'lede',
        html:
          "A <code>.ktx</code> bundle is the file your app will download at 3am. This is the field guide.",
      },
      {
        type: 'paragraph',
        html:
          'Every bundle is a signed container with three load-bearing sections: a <strong>manifest</strong>, a <strong>code section</strong>, and a <strong>resource table</strong>. The header is short; the signature is mandatory; the order is fixed.',
      },
      {
        type: 'heading',
        level: 2,
        num: '§ 01 — THE HEADER',
        html: 'Twelve bytes that never move',
      },
      {
        type: 'paragraph',
        html:
          'Magic, format version, minimum runtime version. Three u32s, in that order, little-endian. We will not change this. We <em>will</em> change what follows.',
      },
      { type: 'signature', html: '— A.V., Mar 27 2026' },
    ],
  },

  {
    id: '019',
    slug: 'register-based-bytecode',
    dispatch: 19,
    title: 'Why we picked <em>register-based</em> bytecode over stack.',
    excerpt: 'A shorter prologue, fewer memory roundtrips, and one very sad engineer who wanted to port Krakatau.',
    date: '2026-03-20',
    dateLabel: 'MAR 20 · 2026',
    readingTime: '15 MIN',
    tags: ['Compiler', 'KBC'],
    primaryTag: 'Compiler',
    author: anya,
    content: [
      {
        type: 'lede',
        html:
          "We looked hard at <strong>stack bytecode</strong>. We picked registers. Here is why, and why it cost us a contributor.",
      },
      {
        type: 'paragraph',
        html:
          'Stack bytecode is simpler to generate and simpler to verify. Register bytecode has a shorter prologue, fewer memory round-trips, and better behavior under JIT. For Compose-heavy code with many implicit parameters, the per-call overhead of a stack machine showed up as measurable cold-start regression.',
      },
      { type: 'signature', html: '— A.V., Mar 20 2026' },
    ],
  },

  {
    id: '018',
    slug: 'hilt-dynamic-seam',
    dispatch: 18,
    title: 'Hilt graphs that cross the <em>dynamic seam</em>.',
    excerpt: "How we resolve an @Inject'ed repository when the repository lives in the host and the composable lives in the bundle.",
    date: '2026-03-12',
    dateLabel: 'MAR 12 · 2026',
    readingTime: '10 MIN',
    tags: ['Runtime', 'Compose'],
    primaryTag: 'Runtime',
    author: isabel,
    content: [
      {
        type: 'lede',
        html:
          "The bundle asks for a repository. The repository lives in the host. The <strong>seam</strong> between them is where dependency injection lives or dies.",
      },
      {
        type: 'paragraph',
        html:
          'We resolve <code>@Inject</code>-marked types through a typed import surface declared at bundle-publish time. The runtime looks up the host binding and returns a proxy; the bundle cannot see the concrete type, which keeps the boundary intact.',
      },
      { type: 'signature', html: '— I.M., Mar 12 2026' },
    ],
  },

  {
    id: '017',
    slug: 'postmortem-3am-bundle',
    dispatch: 17,
    title: "Postmortem: the <em>3 AM bundle</em> that wouldn't cancel.",
    excerpt: 'An infinite LaunchedEffect, a staged rollout, and the two things we changed in the runtime that night.',
    date: '2026-03-06',
    dateLabel: 'MAR 06 · 2026',
    readingTime: '8 MIN',
    tags: ['Field Report', 'Coroutines'],
    primaryTag: 'Field Report',
    author: isabel,
    content: [
      {
        type: 'lede',
        html:
          "At 3:12 AM a bundle went live that would not cancel. The rollout was at 5%. Here is what we changed in the runtime before 4:00 AM.",
      },
      {
        type: 'paragraph',
        html:
          'A <code>LaunchedEffect(Unit) { while (true) }</code> slipped through. Our cancellation path assumed cooperative suspension; the loop had none. The fix: a deadline hook in the scheduler and a verifier rule that requires a suspension point within any unbounded loop inside <code>LaunchedEffect</code>.',
      },
      { type: 'signature', html: '— I.M., Mar 06 2026' },
    ],
  },
];

/**
 * Lightweight list of blogs for the /blogs page.
 * Strips the `content` field so the list route never ships block-level data to the client.
 */
export function getBlogList(): BlogSummary[] {
  return blogs
    .map(({ content: _content, heroImage: _heroImage, ...summary }) => summary)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogs.map((b) => b.slug);
}

/**
 * Returns the previous and next blog (by dispatch order, newest first) for navigation.
 * `prev` is the older dispatch; `next` is the newer dispatch.
 */
export function getAdjacentBlogs(slug: string): { prev?: AdjacentBlog; next?: AdjacentBlog } {
  const sorted = [...blogs].sort((a, b) => b.dispatch - a.dispatch);
  const idx = sorted.findIndex((b) => b.slug === slug);
  if (idx === -1) return {};
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];
  const pick = (b?: Blog): AdjacentBlog | undefined =>
    b ? { slug: b.slug, title: b.title, dispatch: b.dispatch } : undefined;
  return { prev: pick(prev), next: pick(next) };
}

export function getFeatured(): { main?: BlogSummary; sides: BlogSummary[] } {
  const summaries = getBlogList();
  const main = summaries.find((b) => b.featured === 'main');
  const sides = summaries.filter((b) => b.featured === 'side').slice(0, 3);
  return { main, sides };
}

export function getAllTags(): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();
  for (const b of blogs) {
    for (const t of b.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
