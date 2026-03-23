'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HackerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [highScore, setHighScore] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('asif_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const player = { x: 50, y: 150, width: 12, height: 12, velocityY: 0, gravity: 0.5, jump: -8 };
    let obstacles: { x: number, width: number, topHeight: number, gap: number }[] = [];
    let collectibles: { x: number, y: number, radius: number, collected: boolean }[] = [];
    let speed = 4;
    let frames = 0;
    let currentScore = 0;

    const resetGame = () => {
      player.y = 150;
      player.velocityY = 0;
      obstacles = [];
      collectibles = [];
      speed = 4;
      frames = 0;
      currentScore = 0;
      setScore(0);
      setGameState('PLAYING');
      setEasterEgg(false);
    };

    const handleInput = (e?: KeyboardEvent | TouchEvent | MouseEvent) => {
      // Don't intercept typing in inputs or textareas
      const target = e?.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e?.type === 'keydown' && (e as KeyboardEvent).key !== ' ' && (e as KeyboardEvent).key !== 'ArrowUp') return;
      if (e) e.preventDefault();
      
      if (gameState === 'START' || gameState === 'GAME_OVER') {
        resetGame();
      } else if (gameState === 'PLAYING') {
        player.velocityY = player.jump;
      }
    };

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('touchstart', handleInput, { passive: false });
    canvas.addEventListener('mousedown', handleInput);

    const drawStartScreen = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(0, 255, 148, 0.05)';
      ctx.lineWidth = 1;
      for(let i=0; i<canvas.width; i+=50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
      for(let i=0; i<canvas.height; i+=50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

      ctx.fillStyle = 'white';
      ctx.font = '24px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText('PACKET_RUSH.exe', canvas.width/2, canvas.height/2 - 20);
      
      ctx.fillStyle = '#00FF94';
      ctx.font = '16px Courier New';
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        ctx.fillText('Press SPACE or TAP to Initialize', canvas.width/2, canvas.height/2 + 20);
      }
    };

    const drawGameOver = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FF3B3B';
      ctx.font = '40px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText('PACKET LOST', canvas.width/2, canvas.height/2 - 30);
      ctx.fillStyle = 'white';
      ctx.font = '20px Courier New';
      ctx.fillText(`SCORE: ${currentScore}`, canvas.width/2, canvas.height/2 + 20);
      ctx.fillStyle = '#00FF94';
      ctx.fillText(`PERSONAL BEST: ${Math.max(currentScore, highScore)}`, canvas.width/2, canvas.height/2 + 55);
      
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        ctx.fillText('Press SPACE or TAP to Restart', canvas.width/2, canvas.height/2 + 100);
      }
    };

    const loop = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (gameState === 'START') {
        drawStartScreen();
      } else if (gameState === 'GAME_OVER') {
        drawGameOver();
      } else if (gameState === 'PLAYING') {
        ctx.strokeStyle = 'rgba(0, 255, 148, 0.05)';
        ctx.lineWidth = 1;
        const offset = -(frames * (speed/2)) % 50;
        for(let i=offset; i<canvas.width; i+=50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
        for(let i=0; i<canvas.height; i+=50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

        player.velocityY += player.gravity;
        player.y += player.velocityY;

        if (player.y + player.height > canvas.height) { player.y = canvas.height - player.height; player.velocityY = 0; }
        if (player.y < 0) { player.y = 0; player.velocityY = 0; }

        if (frames % Math.max(70, 130 - Math.floor(speed * 8)) === 0) {
          const gap = 120 - Math.min(50, speed * 3);
          const topHeight = Math.random() * (canvas.height - gap - 60) + 30;
          obstacles.push({ x: canvas.width, width: 25, topHeight, gap });
          
          if (Math.random() > 0.4) {
            collectibles.push({ x: canvas.width + Math.random()*50, y: topHeight + gap / 2, radius: 6, collected: false });
          }
        }

        if (currentScore > 0 && currentScore % 500 === 0 && frames % 60 === 0) speed += 0.5;

        // Draw Player
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00FF94';
        ctx.fillStyle = '#00FF94';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.shadowBlur = 0;

        // Update & Draw Collectibles
        for (let i = 0; i < collectibles.length; i++) {
          const c = collectibles[i];
          c.x -= speed;
          if (!c.collected) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00D4FF';
            ctx.fillStyle = '#00D4FF';
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            const dist = Math.hypot(player.x + player.width/2 - c.x, player.y + player.height/2 - c.y);
            if (dist < c.radius + player.width) {
              c.collected = true;
              currentScore += 10;
              setScore(currentScore);
              if (currentScore >= 1337 && currentScore <= 1357) setEasterEgg(true);
            }
          }
        }

        // Update & Draw Obstacles
        ctx.fillStyle = '#FF3B3B';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 59, 59, 0.4)';
        for (let i = 0; i < obstacles.length; i++) {
          const obs = obstacles[i];
          obs.x -= speed;
          ctx.fillRect(obs.x, 0, obs.width, obs.topHeight);
          ctx.fillRect(obs.x, obs.topHeight + obs.gap, obs.width, canvas.height - obs.topHeight - obs.gap);

          if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            (player.y < obs.topHeight || player.y + player.height > obs.topHeight + obs.gap)
          ) {
            setGameState('GAME_OVER');
            if (currentScore > highScore) {
              setHighScore(currentScore);
              localStorage.setItem('asif_highscore', currentScore.toString());
            }
          }
        }
        ctx.shadowBlur = 0;

        obstacles = obstacles.filter(o => o.x + o.width > 0);
        collectibles = collectibles.filter(c => c.x + c.radius > 0);

        if (frames % 10 === 0) { currentScore += 1; setScore(currentScore); }
        if (currentScore >= 1337 && currentScore <= 1350) setEasterEgg(true);

        ctx.fillStyle = 'white';
        ctx.font = '20px Courier New';
        ctx.textAlign = 'right';
        ctx.fillText(`SCORE: ${currentScore}`, canvas.width - 20, 30);
        
        frames++;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleInput);
      canvas.removeEventListener('touchstart', handleInput);
      canvas.removeEventListener('mousedown', handleInput);
    };
  }, [gameState, highScore]);

  return (
    <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
      <div className="w-full mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>Cyber Training</h2>
        <p className="text-zinc-400">Navigate the dark web. Dodge firewalls. Collect encryption keys.</p>
      </div>

      <motion.div 
        className={`w-full max-w-[700px] border border-white/10 rounded-xl overflow-hidden bg-[#0A0A0A] shadow-[0_0_30px_rgba(0,0,0,0.5)] relative ${gameState === 'GAME_OVER' ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
      >
        <div className="bg-[#1A1A1A] px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-[#00FF94]" />
          </div>
          <span className="text-xs font-mono text-zinc-500 font-medium">PACKET_RUSH.exe</span>
          <div className="w-10 text-right text-[#00FF94] font-mono text-xs">{score > 0 ? score : ''}</div>
        </div>

        {easterEgg && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-[#00FF94] text-black px-4 py-2 font-mono font-bold text-sm rounded-lg shadow-[0_0_20px_#00FF94] z-50">
            EASTER EGG: Asif once found a CVE. No cap. 👁️
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          width={700} 
          height={300} 
          className="w-full h-auto cursor-pointer touch-none block"
          style={{ aspectRatio: '700/300' }}
        />
      </motion.div>

      <div className="mt-8 flex gap-8 font-mono text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#00FF94] shadow-[0_0_8px_#00FF94]"></span> Packet
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#FF3B3B] shadow-[0_0_8px_#FF3B3B]"></span> Firewall
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span> Key (+10)
        </div>
      </div>
    </div>
  );
}
