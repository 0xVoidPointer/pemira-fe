import { IdCard, Lock } from "lucide-react";
import { Separator } from "#/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { GoogleLoginButton } from "./google-login-button";

export function LoginForm() {
  return (
    <section>
      <div className="my-8">
        <h1 className="text-4xl font-bold text-primary">MASUK KE PEMIRA</h1>
        <p className="text-muted-foreground">
          Portal Pemilihan Raya Universitas Dian Nuswantoro
        </p>
      </div>
      <form>
        <div className="flex flex-col gap-6">
          <Field className="">
            <FieldLabel htmlFor="nim">Nomor Induk Mahasiswa (NIM)</FieldLabel>
            <InputGroup>
              <InputGroupInput id="nim" placeholder="A11.2023.16000" required />
              <InputGroupAddon align="inline-start">
                <IdCard className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field className="">
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password"
                type="password"
                placeholder="••••••••••"
                required
              />
              <InputGroupAddon align="inline-start">
                <Lock className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button type="submit" className="w-full mt-4">
            Masuk
          </Button>
        </div>
      </form>

      <div className="relative w-full my-8">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Atau Masuk Dengan
          </span>
        </div>
      </div>
      <GoogleLoginButton />
    </section>
    // <CardFooter className="flex-col gap-2">
    // <Button type="submit" className="w-full">
    // {/*Masuk*/}
    // {/*</Button>*/}

    // <div className="relative w-full my-2">
    // <div className="absolute inset-0 flex items-center">
    //   {/*<Separator />*/}
    // {/*</div>*/}
    // <div className="relative flex justify-center text-xs uppercase">
    // <span className="bg-card px-2 text-muted-foreground">
    // {/*Atau Masuk Dengan*/}
    // {/*</span>*/}
    // </div>
    // </div>

    // <GoogleLoginButton />

    // </CardFooter>
    // </Card>
  );
}

// import { IdCard, Lock } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "#/components/ui/card";
// import { Separator } from "#/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Field, FieldLabel } from "@/components/ui/field";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group";
// import { GoogleLoginButton } from "./google-login-button";

// export function LoginForm() {
//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="text-center text-2xl font-bold">
//           PEMIRA 2026
//         </CardTitle>
//         <CardDescription className="text-center">
//           Portal Pemilihan Raya Universitas Dian Nuswantoro
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-6">
//             <Field className="max-w-sm">
//               <FieldLabel htmlFor="nim">Nomor Induk Mahasiswa (NIM)</FieldLabel>
//               <InputGroup>
//                 <InputGroupInput
//                   id="nim"
//                   placeholder="A11.2023.16000"
//                   required
//                 />
//                 <InputGroupAddon align="inline-start">
//                   <IdCard className="text-muted-foreground" />
//                 </InputGroupAddon>
//               </InputGroup>
//             </Field>

//             <Field className="max-w-sm">
//               <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
//               <InputGroup>
//                 <InputGroupInput
//                   id="password"
//                   type="password"
//                   placeholder="••••••••••"
//                   required
//                 />
//                 <InputGroupAddon align="inline-start">
//                   <Lock className="text-muted-foreground" />
//                 </InputGroupAddon>
//               </InputGroup>
//             </Field>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full">
//           Masuk
//         </Button>

//         <div className="relative w-full my-2">
//           <div className="absolute inset-0 flex items-center">
//             <Separator />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-card px-2 text-muted-foreground">
//               Atau Masuk Dengan
//             </span>
//           </div>
//         </div>

//         <GoogleLoginButton />
//       </CardFooter>
//     </Card>
//   );
// }
{
  /*<CardTitle className="text-center text-2xl font-bold">
  PEMIRA 2026
</CardTitle>
<CardDescription className="text-center">
  Portal Pemilihan Raya Universitas Dian Nuswantoro
</CardDescription>*/
}
