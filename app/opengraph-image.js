import { ImageResponse } from 'next/og';
export const alt='Yassine Ikoubazene — Building software and exploring intelligence';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'80px',background:'radial-gradient(circle at 80% 30%, #44355f, #0a0b14 65%)',color:'#f7f4ff',fontFamily:'sans-serif'}}><div style={{display:'flex',fontSize:24,letterSpacing:4,color:'#bda9f6'}}>YASSINE IKOUBAZENE / SOFTWARE ENGINEERING</div><div style={{display:'flex',fontSize:78,fontWeight:700,lineHeight:1.1,marginTop:45,letterSpacing:-4}}>Building software.<br/>Exploring intelligence.</div><div style={{display:'flex',fontSize:22,color:'#aaa1b9',marginTop:45}}>1337 Morocco · Systems · AI · Product building</div></div>,size)}
