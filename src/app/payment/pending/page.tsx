import Link from "next/link"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PendingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Clock className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Pagamento Pendente</CardTitle>
          <CardDescription>Seu pagamento está sendo processado.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Assim que o pagamento for confirmado, você receberá uma notificação por e-mail.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Voltar para a loja</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
