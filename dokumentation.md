# Opgavetitel
Dit navn Benjamin Jasek Smith

Hold nr. WU12

Valgfri opgave: opgave B(opret listing, samt rediger, og slet) og C(opret user), da jeg syntes at det ville være et mere fuldendt produkt, med begge de feautures

## Sådan kommer du igang
```terminal
$ cd projekt

$ projekt % npm run i

$ projekt npm run dev

//Der efter start api

$ cd api

$ api % npm i

$ api % npm start

```

## tech-stack

* **NEXT js:**
Er et react baserer framework, som lader dig arbejder med serverside gennem node.js enviromentet. I next kan du arbejde med componentet, ligesom i react. 

* **React:** 
React er et bibliotekt der laver dig lave funktioner, der returnere front end kode, som i react bliver kaldt komponenter. Det er meget brugt, og grundet komponent bygning, bliver ens kode meget genanvendlig.

* **Git:**
Git er et kontrol versions styrings software system. Der tracker versioner af kode. Det bruges ofte af programmører som vil dele sin kode, eller arbejder sammen med andre på det samme projekt.

* **React-icons:** 
Et icon bibliotek lavet til react, som lader dig sætte ikoner ind som react componenter. Bruger ikoner fra mange ikonudbyddere, blandt andet font-awesome.

* **SASS:**
sass er en udvidelse til css, som blandt andet lader dig laver funktioner, som i sass er kaldt mixins. Du kan også bruge "&" til at tilføje ekstra ting til din class istedet for at skrive den hele igen. Det er meget smart når man bruger BEM. SASS compiler koden til css, når du kører det.

* **Web-api SwapHub:**
Det api jeg brugte til min eksamen opgave. Det indeholder dataen fra Swaphub, jeg har også selv skrevet data til api'et når jeg skulle lave nye listings og users

* **Zod:**
er et typescript-first validerings bibliotek. Du definere et schema (et z object) som du så bagefter kan validere, ved at sende den gennem en parse, og udfylde dens props med values. Jeg brugte det til javascript i min kode

* **Pixels-to-rem(hjemmelavet vscode plugin)**
Det er et vscode plugin, jeg selv har lavet, genem hele opgaven har den været ret brugbar, da den direkte convertere px til rem i koden. ved at skrive "16 p-t-r" giver den dette = 1rem /* 16 / 16 = 1 */


## kode-eksempel
(Min login SeverAction : projekt/src/actions/loginAction.js)
```javascript

"use server";
import fetcher from "@/utils/fetcher";
import { cookies } from "next/headers";
import z from "zod"
export default async function loginAction(prevstate,formData){
    console.log("jejrj")
  const {email,password} = Object.fromEntries(formData)

  const LoginScheme = z.object({
    email: z.email(("Du skal skrive en mail her")).min(1,"du skal skrive noget i mail"),
    password: z.string().min(1,"du skal skrive password")
  })

  const validatedLogin = LoginScheme.safeParse({
    email: email,
    password: password
  })
console.log(validatedLogin)
  /*Guar clause*/
if(!validatedLogin.success){
    console.log("sender nu")
    return{
        success:validatedLogin.success,
        errors: z.treeifyError(validatedLogin.error),
        email: email,
        password: password,


    }
}
const jsonObject = JSON.stringify({
        "email": validatedLogin.data.email,
        "password": validatedLogin.data.password


    })

//hvis zod validation lykkedes, sender vi dataen til api'et for at logge ind

const user =  await fetcher("http://localhost:4000/auth/token", {
    "method": "POST",

  "headers": { "Content-Type": "application/json" },
   "body": jsonObject
})
console.log(user.responseCode, "ereurueruuu")

if(user.responseCode == 500){
    return{
        success:false,
        errors: {properties:{ all: ["Der skete en fejl på serveren...prøv igen"]}},
     email: email,
        password: password,
    }
}
if(user.responseCode == 401){
    return{
        success:false,
        errors: {properties:{ all: ["Denne bruger findes desværre ikke"]}},
     email: email,
        password: password,
    }
}
 console.log("user :",user)

const cookieStore = await cookies()
cookieStore.set("sh_token", user.token, {maxAge: 3600})
cookieStore.set("user_id", user.userId, {maxAge: 3600})

return{
     success:true,
        errors:{},
     email: email,
        password: password,
    }

   
}


```

### kode-eksempel forklaring
Jeg starter med at skrive "use server" i toppen af min fil, det indikere til next at denne fil skal eksikveres på serven, og mit tilfælde er dette en server action.

Derefter sker min imports, samt oprettelsen af min funktion. Grundet det er en server action skal denne funktion være asynkron, det skal alle server filer i next. 

Denne funktionen bliver kaldt gennem en react hook, som hedder actionState, som bruges til at kører funktioner som en action på en form. Det hjæper også med at gemme return værdien i en state og prevent reolad af siden, som en normal form  submit action ville gøre. Grundet den bliver kaldt gennem den hook, har den to argumenter som default. Den ene er den previous state, og den anden er et Formdata objekt, som indeholder Formdata fra den pågælende form vi har sat action staten på.

Nu deconstructer jeg så formData objektet hved hjælp af den statiske metode på Object klassen. Den skal skal bruge en liste af key og values par ligesom i vores formData objekt. Den returnere så et object med en key og en value, som jeg kan deconstructe valuesne til constanter på, som vi så senere kan bruge.

Nu bruger jeg så zod til at validere min data. Først opretter jeg et Schema som jeg senere kan validere. Det gør jeg ved at bruge z.object() metoden som skal have et objekt . Her laver jeg en key, for hver input. Afhængigt af hvad hvilken input jeg skal validere, bruge jeg forskellige metoder på z, til at validere dataen på. blandt andet bruge jeg z.email(), til at validere email. alle metoderne kan man give et parameter, der vises under errors i det færdig valideret objekt. Det er dog forskelligt hvilket nummer fejlbesked skal være som parameter, da nogle af metoderne, tager flere parameter, som f.eks. min().

Efter det tager jeg og kører .SafeParse() metoden på mit schema og gemmer det i en ny const. safeParse validere min data uden af at kaste en error og stoppe koden, iforhold til hvis man bare brugte .parse(). så kan jeg nemlig selv holde styr på errorsne og bare sende dem til brugeren som en besked.

Efter det laver jeg en gaurd clause på mit resultat af safeParse. Der tjekker jeg om success er true, og hvis den er ikke er det. returnere jeg et objekt, som indeholder succes, som er succes propetyen som jeg også tjekker på i min gaurd clause. Jeg returnere også errors, det er min error propety på min safeParse resultat. Men pga. at zod ligger meget vægt på fuldstædighed og korrektion, bliver den meget lang. Pga. jeg skal sende den til brugen putter jeg den ind i z.treeifyError() metoden istedet. Som laver min errors om til et nested objekt. Da jeg skal sende det til brugeren er det fint, den bare sender mig fejlbesekederne fra tidligere. som jeg får ud. Det er også smart fordi jeg har lavet et formKomponent som jeg bare kan genbruge, som så automatisk finder fejlbeskeden og viser den under input. ved hjælp af treeifyError



Hvis alt så forløber godt, går vi videre til at sende en POST request til apiet, ved hjælp af min asynkrone fetcher funktionen. Der sender jeg min body med, som er mine valideret inputs i et objekt. Det convetere jeg til Json ved hjælp af JSON.stringyfy() som er en statisk metode på JSON klassen. Jeg sender også en header med, som foræller api'et at jeg vil sende json. Det stod også inde i dokumentationen på api'et.

Da min fetcher funktion er en try catch. Har jeg gjordt sådan at den sender et objekt tilbage, som blandt andet indeholder en error besked, men også en responcode, hvis reponset går galt. Først tjekker jeg om jeg får responsekode 500, som betyder internal server error. Hvis jeg gør det, sender jeg et objekt tilbage til brugern. Denne gang sætter jeg dog selv error beskeden, som min form så opfanger, og viser til brugen. Jeg sender også input værdierne tilbage, så brugeren let kan prøve igen

Derefter tjekker jeg om jeg får koden 401, som betyder Unauthorized. Den kode sender apiet tilbage hvis brugeren ikke findes. Derfor giver jeg dem også en fejlbesked om at brugeren ikke findes

Hvis ingen af de fejl sker, opretter jeg så 2 cookies for at logge brugeren ind. Det gør jeg ved hjælp af den asynkrone funktion cookies() fra next, som jeg så lagre i en constant. og ved hjælp af .set() metoden, opretter jeg en token cookie og en user_id . set(tager imod 3 parameter ), den første er key, som er navnet på cookien, den anden som er værdien, og den tredje som er et options objekt, som jeg blandt andet bruger til at angive udløbsdatoen på cookien. Det gør jeg med keyen maxAge.

Efter det returnere jeg så et objekt og denne gang med success true. Den bruger jeg så på min side i en useEffect, og sender brugeren videre til profil siden 

