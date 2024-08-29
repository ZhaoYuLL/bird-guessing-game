import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BirdRecording {
  id: string;
  en: string;
  gen: string;
  sp: string;
  cnt: string;
  loc: string;
  audioUrl: string;
}