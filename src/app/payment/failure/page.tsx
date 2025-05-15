import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FailurePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Pagamento Recusado</CardTitle>
          <CardDescription>Houve um problema ao processar seu pagamento.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Por favor, verifique os dados do seu cartão e tente novamente ou escolha outro método de pagamento.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Tentar novamente</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
