$variavel1 = 1
$variavel2 = 0

HotKeySet("c","ClicMouse")
HotKeySet("{esc}","Sair")

While $variavel1
   if $variavel2 = 1 Then
	  Exit
   EndIf
WEnd

Func ClicMouse()
   ;*** Funcao mouse e teclado ***
   Local $file = FileOpen("texto.txt",1) ;0 = somente leitura ;1 = somente escrita, final do arquivo;2 = apaga e escreve novo
   Local $aPos = MouseGetPos()
   MsgBox(1, "Mouse x, y:", $aPos[0] & ", " & $aPos[1],1)

   FileWrite($file,"x y:" & $aPos[0] & "," & $aPos[1] & @CR)

   FileClose($file)
EndFunc

Func Sair()
   $variavel2 = 1
EndFunc