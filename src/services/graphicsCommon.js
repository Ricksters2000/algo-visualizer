import {canvasContext} from "../main";

export const drawBitmapCenteredWithRotation = (useBitmap, atX, atY, withAng) => {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
	canvasContext.restore();
}

export const colorRect = (X,Y, boxWidth, boxHeight, fillColor) => {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(X,Y, boxWidth, boxHeight);
}
	
export const colorCircle = (X,Y, radius, fillColor) => {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(X,Y, radius,0,Math.PI*2, true);
	canvasContext.fill();
}
	
export const colorText = (showWords, textX,textY, fillColor, fontStyle) => {
	canvasContext.fillStyle = fillColor;
	canvasContext.font = fontStyle; //"14px Arial Black"
	canvasContext.fillText(showWords, textX,textY);
}