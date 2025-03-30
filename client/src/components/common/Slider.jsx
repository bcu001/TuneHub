import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import Card from "@/components/cards/Card"
import { assets } from '@/assets/assets';

const featureSongs = [assets.defaultProfile, assets.logo];

const Slider = () => {

    return (
        <div className='mt-16'>
            <div className='absolute left-0 flex gap-4 border'>
                {
                    featureSongs.map((song, index) => (
                        <div key={index} className="w-[200px] h-[200px" >
                            <Card song={song} />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default Slider