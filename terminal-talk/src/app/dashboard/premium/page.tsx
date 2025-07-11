import { Button } from '@/app/_components/util/Button';
import { Crown, Zap } from 'lucide-react';

export default function PremiumLibrary() {
  return (
    <>
      <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm text-center">
        <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">
          Premium Features Comming Soon!
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Part Of TerminalTalks V1.0 is the research behind what makes a great
          audio lecture! Before we launch any premium courses and take your hard
          earned money. Bare with us as we perfect our craft :D
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500"
          >
            <Crown className="h-5 w-5 mr-2" />
            Comming Soon
          </Button>
          <Button size="lg" variant="outline">
            Comming Soon!
          </Button>
        </div>
      </div>
    </>
  );
}
