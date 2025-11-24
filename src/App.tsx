import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import ChecklistDemo from './pages/ChecklistDemo'
import GameBoardDemo from './pages/GameBoardDemo'

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/checklist" element={<ChecklistDemo />} />
        <Route path="/demo/gameboard" element={<GameBoardDemo />} />
      </Routes>
    </>
  )
}
