import { AppContext } from '@/context/app'
import {
  createOnboardingApp,
  type StageNavigation,
} from '@worthai/onboarding-sdk'
import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react'
import Loading from '@/components/onboarding/Loading'

const Onboarding = (): ReactElement => {
  const ref = useRef<HTMLDivElement>(null)
  const { token } = useContext(AppContext)
  const [navigation, setNavigation] = useState<StageNavigation>()
  const [loading, setLoading] = useState(true)
  const onboardingApp = useMemo(
    () =>
      createOnboardingApp({
        origin: 'https://app.dev.joinworth.com',
        inviteToken: token,
        mode: 'embedded',
      }),
    [token],
  )

  onboardingApp.setCustomCss(
    `
    .rounded-xl {
      border: 3px solid #FFC100;
    }  
  `,
  )

  useEffect(() => {
    const container = ref.current
    if (!container) return

    container.appendChild(onboardingApp.iframe)
    const subscription = onboardingApp.subscribe((event) => {
      switch (event.data.type) {
        case 'AUTHENTICATING':
          setLoading(true)
          break
        case 'ONBOARDING_STARTED':
        case 'AUTHENTICATION_FAILED':
          setLoading(false)
          break
        case 'STAGE_NAVIGATION':
          setNavigation(event.data.payload.stageNavigation)
          break
        default:
          break
      }
    })

    return () => {
      if (container && container.contains(onboardingApp.iframe)) {
        container.removeChild(onboardingApp.iframe)
      }
      subscription.unsubscribe()
    }
  }, [onboardingApp])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div ref={ref} className="min-h-screen bg-blue-950"></div>
      <div className="flex gap-4 justify-center p-4 bg-blue-950">
        <button
          disabled={navigation?.prevStatus.disabled}
          onClick={() => onboardingApp.prev()}
          className="button-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          disabled={navigation?.skipStatus.disabled}
          onClick={() => onboardingApp.skip()}
          className="button-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip
        </button>
        {navigation?.nextStatus.visible && (
          <button
            disabled={navigation?.nextStatus.disabled}
            onClick={() => onboardingApp.next()}
            className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {navigation?.nextStatus.isSubmit ? 'Submit' : 'Next'}
          </button>
        )}
      </div>
    </>
  )
}

export default Onboarding
