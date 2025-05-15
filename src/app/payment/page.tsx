import PaymentForm from "./payment-form";
import { ShieldCheck, CreditCard, Clock } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">Produto Premium</h1>
        <p className="text-center text-gray-500 mb-6">
          Acesso completo por apenas R$ 99,00
        </p>

        <PaymentForm />

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </div>
            <span className="text-xs font-medium">Pagamento Seguro</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xs font-medium">Múltiplos Cartões</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-xs font-medium">Acesso Imediato</span>
          </div>
        </div>
      </div>
    </main>
  );
}
