import React, { useEffect, useState } from 'react';
import FixCard from '@/components/cards/FixCard';
import useMeasure from 'react-use-measure';
import { motion, animate, useMotionValue } from 'framer-motion';
import axios from 'axios';


const FeaturedSongs = () => {
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;
  const [duration, setDuration] = useState(FAST_DURATION);
  const [featureSongs, setFeatureSongs] = useState([]); // Changed from null to []
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }
    return () => controls?.stop(); // Cleanup animation on unmount
  }, [xTranslation, width, duration, rerender]);

  useEffect(() => {
    handleFeatureSongs();
  }, []);

  const handleFeatureSongs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/songs/featuredSongs');
      setFeatureSongs(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching featured songs:', error);
    }
  };

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Featured Songs</h2>
      <div className="py-6 overflow-hidden h-[250px] relative">
        <motion.div
          className="absolute left-0 flex gap-4"
          ref={ref}
          style={{ x: xTranslation }}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
        >
          {featureSongs.length > 0 &&
            featureSongs.map((song, idx) => <FixCard key={idx} song={song} />)}

          {featureSongs.length > 0 &&
            featureSongs.map((song, idx) => <FixCard key={`copy-${idx}`} song={song} />)}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSongs;
