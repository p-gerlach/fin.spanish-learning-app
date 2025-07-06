const grammarLessons = [
    // --- A1 ---
    {
        level: "A1",
        topic: "Tenses",
        title: "Present Tense of Regular -AR Verbs",
        content: `
            <p>To conjugate regular <b>-AR</b> verbs in the present tense, remove the <b>-ar</b> and add:</p>
            <ul>
                <li><b>yo</b>: -o</li>
                <li><b>tú</b>: -as</li>
                <li><b>él/ella/usted</b>: -a</li>
                <li><b>nosotros</b>: -amos</li>
                <li><b>vosotros</b>: -áis</li>
                <li><b>ellos/ellas/ustedes</b>: -an</li>
            </ul>
            <p>Example: <b>hablar</b> (to speak): yo hablo, tú hablas, él habla...</p>
        `
    },
    {
        level: "A1",
        topic: "Nouns & Articles",
        title: "Gender of Nouns",
        content: `
            <p>Most nouns ending in <b>-o</b> are masculine, <b>-a</b> are feminine. There are exceptions.</p>
            <p>Examples: <b>el libro</b> (the book), <b>la mesa</b> (the table)</p>
        `
    },
    {
        level: "A1",
        topic: "Nouns & Articles",
        title: "Definite and Indefinite Articles",
        content: `
            <p>Spanish has four definite articles: <b>el</b> (masc. sing.), <b>la</b> (fem. sing.), <b>los</b> (masc. pl.), <b>las</b> (fem. pl.).</p>
            <p>Indefinite articles: <b>un</b>, <b>una</b>, <b>unos</b>, <b>unas</b>.</p>
        `
    },
    {
        level: "A1",
        topic: "Verbs",
        title: "Ser vs. Estar",
        content: `
            <p>Both mean "to be", but are used differently:</p>
            <ul>
                <li><b>ser</b>: for permanent characteristics, origin, time, profession.</li>
                <li><b>estar</b>: for temporary states, location, ongoing actions.</li>
            </ul>
            <p>Examples: Soy estudiante. Estoy cansado.</p>
        `
    },
    // --- A2 ---
    {
        level: "A2",
        topic: "Tenses",
        title: "Preterite vs. Imperfect (Past Tenses)",
        content: `
            <p>Spanish has two main past tenses:</p>
            <ul>
                <li><b>Preterite</b>: Used for completed actions in the past.<br>
                    Example: <i>Ayer comí pizza.</i> (Yesterday I ate pizza.)</li>
                <li><b>Imperfect</b>: Used for ongoing, habitual, or background actions in the past.<br>
                    Example: <i>Cuando era niño, jugaba mucho.</i> (When I was a child, I used to play a lot.)</li>
            </ul>
            <p>Key words for imperfect: siempre, a menudo, mientras, de niño...</p>
        `
    },
    {
        level: "A2",
        topic: "Pronouns",
        title: "Direct and Indirect Object Pronouns",
        content: `
            <p><b>Direct objects</b> answer "what?" or "whom?"<br>
            Pronouns: me, te, lo/la, nos, os, los/las</p>
            <p><b>Indirect objects</b> answer "to whom?" or "for whom?"<br>
            Pronouns: me, te, le, nos, os, les</p>
            <p>Order: Indirect before direct.<br>
            Example: <i>Se lo di.</i> (I gave it to him/her.)</p>
        `
    },
    {
        level: "A2",
        topic: "Pronouns",
        title: "Reflexive Verbs",
        content: `
            <p>Reflexive verbs indicate the subject does the action to itself. They use pronouns: me, te, se, nos, os, se.</p>
            <p>Example: <i>Me levanto a las 7.</i> (I get up at 7.)</p>
            <p>Infinitive form: <b>levantarse</b>, <b>ducharse</b>, etc.</p>
        `
    },
    {
        level: "A2",
        topic: "Prepositions & Cases",
        title: "Por vs. Para",
        content: `
            <p>Both mean "for", but are used differently:</p>
            <ul>
                <li><b>Por</b>: cause, duration, exchange, movement through, means.<br>
                    Example: <i>Gracias por la ayuda.</i></li>
                <li><b>Para</b>: purpose, recipient, deadline, destination, comparison.<br>
                    Example: <i>Este regalo es para ti.</i></li>
            </ul>
        `
    },
    // --- B1 ---
    {
        level: "B1",
        topic: "Mood",
        title: "Subjunctive Mood (Present and Past)",
        content: `
            <p>The <b>subjunctive</b> is used for wishes, doubts, emotions, recommendations, and hypothetical situations.</p>
            <p><b>Present Subjunctive:</b> Start with the "yo" form, drop the "o", add:</p>
            <ul>
                <li>AR: e, es, e, emos, éis, en</li>
                <li>ER/IR: a, as, a, amos, áis, an</li>
            </ul>
            <p>Example: <i>Espero que vengas.</i> (I hope you come.)</p>
            <p><b>Past Subjunctive:</b> Use the 3rd person plural preterite, drop "-ron", add: ra, ras, ra, ramos, rais, ran.<br>
            Example: <i>Si tuviera dinero...</i> (If I had money...)</p>
        `
    },
    {
        level: "B1",
        topic: "Mood",
        title: "Commands (Imperative)",
        content: `
            <p>Commands use the imperative mood. Forms differ for tú, usted, vosotros, ustedes.</p>
            <ul>
                <li><b>Affirmative tú:</b> 3rd person singular present. <i>¡Habla!</i> (Speak!)</li>
                <li><b>Negative tú:</b> present subjunctive. <i>¡No hables!</i> (Don't speak!)</li>
                <li><b>Usted:</b> present subjunctive. <i>¡Hable!</i></li>
            </ul>
            <p>Irregulars: ven, di, sal, haz, ten, ve, pon, sé</p>
        `
    },
    {
        level: "B1",
        topic: "Tenses",
        title: "Conditional Tense",
        content: `
            <p>Used for "would" actions. Add endings to the infinitive: ía, ías, ía, íamos, íais, ían.</p>
            <p>Example: <i>Me gustaría viajar.</i> (I would like to travel.)</p>
            <p>Irregulars: decir → diría, hacer → haría, poder → podría, etc.</p>
        `
    },
    {
        level: "B1",
        topic: "Tenses",
        title: "Future Tense",
        content: `
            <p>Used for "will" actions. Add endings to the infinitive: é, ás, á, emos, éis, án.</p>
            <p>Example: <i>Estudiaré mañana.</i> (I will study tomorrow.)</p>
            <p>Irregulars: tener → tendré, salir → saldré, venir → vendré, etc.</p>
        `
    },
    {
        level: "B1",
        topic: "Pronouns",
        title: "Relative Pronouns (que, quien, lo que, etc.)",
        content: `
            <p>Used to connect clauses:</p>
            <ul>
                <li><b>que</b>: that, which, who</li>
                <li><b>quien(es)</b>: who, whom (for people, after prepositions)</li>
                <li><b>lo que</b>: what, that which (for ideas, situations)</li>
            </ul>
            <p>Example: <i>La persona que habla es mi amiga.</i></p>
        `
    },
    {
        level: "B1",
        topic: "Voice",
        title: "Passive Voice",
        content: `
            <p>Formed with <b>ser</b> + past participle (+ por):<br>
            <i>El libro fue escrito por Cervantes.</i> (The book was written by Cervantes.)</p>
            <p>Also common: <b>se</b> + verb (impersonal passive):<br>
            <i>Se venden casas.</i> (Houses are sold.)</p>
        `
    },
    {
        level: "B1",
        topic: "Verbs",
        title: "Gustar and Similar Verbs",
        content: `
            <p>Verbs like <b>gustar</b> use indirect object pronouns and agree with the subject (thing liked):</p>
            <p><i>Me gusta el libro.</i> (I like the book.)<br>
            <i>Me gustan los libros.</i> (I like the books.)</p>
            <p>Other verbs: encantar, interesar, doler, faltar, quedar...</p>
        `
    },
    {
        level: "B1",
        topic: "Agreement",
        title: "Agreement of Adjectives",
        content: `
            <p>Adjectives agree in gender and number with the noun they describe.</p>
            <p>Example: <i>El libro rojo</i> (the red book), <i>Las casas blancas</i> (the white houses)</p>
            <p>Most adjectives ending in -o/-a change for gender; those ending in -e or consonant usually do not.</p>
        `
    },
    // --- B2 ---
    {
        level: "B2",
        topic: "Pronouns",
        title: "Use of “se” (Impersonal, Passive, Accidental)",
        content: `
            <ul>
                <li><b>Impersonal:</b> <i>Se vive bien aquí.</i> (One lives well here.)</li>
                <li><b>Passive:</b> <i>Se venden coches.</i> (Cars are sold.)</li>
                <li><b>Accidental:</b> <i>Se me olvidó.</i> (I forgot.)</li>
            </ul>
            <p>"Se" is very versatile in Spanish!</p>
        `
    },
    {
        level: "B2",
        topic: "Sentence Structure",
        title: "Reported Speech (El Estilo Indirecto)",
        content: `
            <p>Used to report what someone said. Often involves shifting tenses:</p>
            <ul>
                <li>Present → Imperfect: <i>Dijo que tenía hambre.</i> (He said he was hungry.)</li>
                <li>Preterite → Past Perfect: <i>Dijo que había comido.</i> (He said he had eaten.)</li>
            </ul>
            <p>Common reporting verbs: decir, preguntar, contar, explicar...</p>
        `
    },
    // --- C1 ---
    {
        level: "C1",
        topic: "Verbal Periphrasis",
        title: "Periphrastic Constructions (Perífrasis Verbales)",
        content: `
            <p>Periphrasis are verb phrases that express nuances of aspect, intention, or repetition.</p>
            <ul>
                <li><b>Ir a + infinitive:</b> Voy a estudiar. (I'm going to study.)</li>
                <li><b>Acabar de + infinitive:</b> Acabo de llegar. (I have just arrived.)</li>
                <li><b>Volver a + infinitive:</b> Volvió a llamar. (He called again.)</li>
                <li><b>Estar a punto de + infinitive:</b> Estoy a punto de salir. (I'm about to leave.)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Mood",
        title: "Advanced Subjunctive Uses",
        content: `
            <p>Subjunctive is used after certain conjunctions (aunque, cuando, en cuanto, etc.), in relative clauses, and for polite requests or hypothetical statements.</p>
            <p>Examples:</p>
            <ul>
                <li><i>Busco un libro que sea interesante.</i> (I'm looking for a book that is interesting.)</li>
                <li><i>Aunque llueva, iremos.</i> (Even if it rains, we'll go.)</li>
                <li><i>Ojalá hubiera sabido.</i> (If only I had known.)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Tenses",
        title: "The Future Perfect and Conditional Perfect",
        content: `
            <p><b>Future Perfect:</b> Used to express what will have happened.<br>
            <i>Habré terminado para las cinco.</i> (I will have finished by five.)</p>
            <p><b>Conditional Perfect:</b> Used for what would have happened.<br>
            <i>Habría ido, pero estaba enfermo.</i> (I would have gone, but I was sick.)</p>
        `
    },
    {
        level: "C1",
        topic: "Voice",
        title: "The Passive 'Se' and Passive Constructions",
        content: `
            <p>Besides the standard passive, Spanish uses <b>se</b> for passive or impersonal constructions:</p>
            <ul>
                <li><i>Se construyó la casa en 1990.</i> (The house was built in 1990.)</li>
                <li><i>Se dice que...</i> (It is said that...)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Nouns & Articles",
        title: "Nominalization and Substantivized Adjectives",
        content: `
            <p>Adjectives and participles can be used as nouns:</p>
            <ul>
                <li><i>El rico</i> (the rich man), <i>los jóvenes</i> (the young people)</li>
                <li><i>Lo bueno</i> (the good thing)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Idioms & Expressions",
        title: "Idiomatic Expressions and Fixed Phrases",
        content: `
            <p>Spanish is rich in idioms. Examples:</p>
            <ul>
                <li><i>Estar en las nubes</i> (to daydream)</li>
                <li><i>No tener pelos en la lengua</i> (to be outspoken)</li>
                <li><i>Dar en el clavo</i> (to hit the nail on the head)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Sentence Structure",
        title: "Inversion and Emphatic Structures",
        content: `
            <p>Word order can be changed for emphasis:</p>
            <ul>
                <li><i>Jamás había visto algo así.</i> (Never had I seen such a thing.)</li>
                <li><i>Fue Juan quien lo hizo.</i> (It was Juan who did it.)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Pronouns",
        title: "Advanced Use of Relative Clauses",
        content: `
            <p>Relative clauses can be restrictive or non-restrictive, and can use <b>cuyo/a/os/as</b> (whose):</p>
            <ul>
                <li><i>La chica cuyo padre es médico...</i> (The girl whose father is a doctor...)</li>
                <li><i>Madrid, donde nací, es una ciudad vibrante.</i> (Madrid, where I was born, is a vibrant city.)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Tenses",
        title: "The Use of the Gerund and Past Participle",
        content: `
            <p>The gerund (-ando, -iendo) is used for ongoing actions, but not as a noun (unlike English "-ing").</p>
            <p>The past participle is used in perfect tenses and as an adjective.</p>
            <ul>
                <li><i>Estoy leyendo.</i> (I am reading.)</li>
                <li><i>He comido.</i> (I have eaten.)</li>
                <li><i>La puerta está cerrada.</i> (The door is closed.)</li>
            </ul>
        `
    },
    {
        level: "C1",
        topic: "Sentence Structure",
        title: "Concessive Clauses and Advanced Connectors",
        content: `
            <p>Concessive clauses express contrast or concession, often using <b>aunque</b>, <b>a pesar de que</b>, <b>por más que</b>:</p>
            <ul>
                <li><i>Aunque sea difícil, lo haré.</i> (Even if it's hard, I'll do it.)</li>
                <li><i>Por más que estudies, no aprobarás sin practicar.</i> (No matter how much you study, you won't pass without practice.)</li>
            </ul>
        `
    },
    // --- C2 ---
    {
        level: "C2",
        topic: "Mood",
        title: "Advanced Use of the Subjunctive in Conditional Sentences",
        content: `
            <p>Third conditional (impossible past):</p>
            <ul>
                <li><i>Si hubiera sabido, habría venido.</i> (If I had known, I would have come.)</li>
            </ul>
            <p>Mixed conditionals and nuanced hypothetical statements are common at C2.</p>
        `
    },
    {
        level: "C2",
        topic: "Sentence Structure",
        title: "Indirect Questions and Polite Requests",
        content: `
            <p>Indirect questions use the subjunctive and polite forms:</p>
            <ul>
                <li><i>No sé dónde esté Juan.</i> (I don't know where Juan is.)</li>
                <li><i>¿Podría decirme qué hora es?</i> (Could you tell me what time it is?)</li>
            </ul>
        `
    },
    {
        level: "C2",
        topic: "Cohesion & Register",
        title: "Discourse Markers and Cohesive Devices",
        content: `
            <p>Advanced Spanish uses connectors for argumentation and cohesion:</p>
            <ul>
                <li><b>Sin embargo</b> (however), <b>por lo tanto</b> (therefore), <b>en cambio</b> (on the other hand), <b>además</b> (furthermore), <b>de hecho</b> (in fact)</li>
            </ul>
            <p>These are essential for essays, debates, and formal writing.</p>
        `
    },
    {
        level: "C2",
        topic: "Register & Formality",
        title: "Register and Formality in Spanish",
        content: `
            <p>Spanish varies register (formal/informal) with pronouns (tú/usted/vosotros/ustedes), verb forms, and vocabulary.</p>
            <p>At C2, you should be able to switch register appropriately in speech and writing.</p>
        `
    },
    {
        level: "C2",
        topic: "Tenses",
        title: "Nuances of Aspect: Perfective vs. Imperfective",
        content: `
            <p>Spanish distinguishes between completed (perfective) and ongoing/habitual (imperfective) actions, especially in the past.</p>
            <ul>
                <li><i>Leía cuando llegó mi amigo.</i> (I was reading when my friend arrived.)</li>
                <li><i>He estado trabajando mucho últimamente.</i> (I've been working a lot lately.)</li>
            </ul>
        `
    },
    {
        level: "C2",
        topic: "Pronouns",
        title: "Advanced Use of 'Lo' as a Neuter Article and Pronoun",
        content: `
            <p>'Lo' is used for abstract ideas, qualities, or as a neuter pronoun:</p>
            <ul>
                <li><i>Lo importante es participar.</i> (The important thing is to participate.)</li>
                <li><i>No lo sé.</i> (I don't know it/that.)</li>
            </ul>
        `
    },
    {
        level: "C2",
        topic: "Pronouns",
        title: "Emphatic and Redundant Object Pronouns",
        content: `
            <p>Spanish often uses redundant object pronouns for emphasis or clarity:</p>
            <ul>
                <li><i>A Juan lo vi ayer.</i> (I saw Juan yesterday.)</li>
                <li><i>Le di el libro a María.</i> (I gave the book to María.)</li>
            </ul>
        `
    },
    {
        level: "C2",
        topic: "Pronouns",
        title: "Advanced Use of 'Se' (Dativo de interés, Recíproco, Medio)",
        content: `
            <p>'Se' can indicate:</p>
            <ul>
                <li><b>Dativo de interés:</b> <i>Se me cayó el vaso.</i> (The glass fell on me.)</li>
                <li><b>Reciprocal:</b> <i>Se miran.</i> (They look at each other.)</li>
                <li><b>Medio:</b> <i>Se comió el pastel.</i> (He ate up the cake.)</li>
            </ul>
        `
    },
    {
        level: "C2",
        topic: "Sentence Structure",
        title: "Nominal, Adjectival, and Adverbial Subordinate Clauses",
        content: `
            <p>At C2, you should master all types of subordinate clauses:</p>
            <ul>
                <li><b>Nominal:</b> <i>Quiero que vengas.</i></li>
                <li><b>Adjectival:</b> <i>Busco a alguien que hable inglés.</i></li>
                <li><b>Adverbial:</b> <i>Saldré cuando termine.</i></li>
            </ul>
        `
    }
];