import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import Spinner from "@/components/Spinner.tsx"

interface QuestionnaireData {
  terms: [string, string],
  expires_in: number,
  questionnaire_id: string
}

export default function Questionnaire() {
  const questionnaireRoute = `${window?.location?.origin}/api/questionnaire`
  const [isLoading, setIsLoading] = useState(true);
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  
  const [questionnaireId, setQuestionnaireId] = useState("")

  const refreshOptions = async () => {
    if (IS_BROWSER) {
      setIsLoading(true)
      const questionnaireData: QuestionnaireData = await (await fetch(questionnaireRoute, {
        method: "GET",
      })).json()
      setQuestionnaireId(questionnaireData.questionnaire_id)
      setOptionA(questionnaireData.terms[0])
      setOptionB(questionnaireData.terms[1])
      setIsLoading(false)
    }
  }

  const sendPreference = async (preference: number) => {
    if (IS_BROWSER) {
      await fetch(questionnaireRoute, {
        method: "POST",
        body: JSON.stringify({ questionnaire_id: questionnaireId, preference: preference })
      })
      refreshOptions()
    }
  }

  const onSelected = (preference: number) => {
    if (IS_BROWSER) {
      sendPreference(preference)
    }
  }

  useEffect(() => {
    refreshOptions()
  }, [])

  return (
    <div class="flex items-center content-center">
      <div class="flex w-full">
        <Button isLoading={isLoading} disabled={isLoading} isLeft={true} onClick={() => onSelected(0)}>
          {optionA}
        </Button>
        <Button isLoading={isLoading} disabled={isLoading} isLeft={false} onClick={() => onSelected(1)}>
          {optionB}
        </Button>
      </div>
    </div>
  );
}
