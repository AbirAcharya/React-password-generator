import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [allowNumbers, setAllowNumbers] = useState(false)
  const [allowSymbols, setAllowSymbols] = useState(false)

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  const alerting = useCallback(() => {
    alert('Password copied to clipboard!')
  }, [])

  const generatePassword = useCallback(() => {
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-='
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (allowNumbers) {
      letters += numbers
    }
    if (allowSymbols) {
      letters += symbols
    }
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length)
      password += letters[randomIndex]
    }
    setPassword(password)
  }, [length, allowNumbers, allowSymbols])

  useEffect(() => {
    generatePassword()
  }, [length, allowNumbers, allowSymbols, generatePassword])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 flex flex-col gap-7">
        <div className="text-center space-y-1.5">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Password Generator
          </h1>
          <p className="text-sm text-slate-400">
            Create strong, randomized credentials instantly
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3.5 font-mono text-lg tracking-wider text-emerald-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-inner"
            placeholder="Password"
          />
          <button
            className="px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
            onClick={() => {
              copyPassword()
              alerting()
            }}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-5 pt-2 border-t border-white/10">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">Password Length</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono font-semibold border border-cyan-500/20">
                {length}
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={18}
              value={length}
              className="range range-info range-sm w-full cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-sm font-medium text-slate-200">Symbols</span>
              <input
                type="checkbox"
                checked={allowSymbols}
                onChange={() => setAllowSymbols((prev) => !prev)}
                className="checkbox checkbox-sm checkbox-info"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-sm font-medium text-slate-200">Numbers</span>
              <input
                type="checkbox"
                checked={allowNumbers}
                onChange={() => setAllowNumbers((prev) => !prev)}
                className="checkbox checkbox-sm checkbox-info"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App