#include <MsgBoxConstants.au3>
#include <Excel.au3>
#include <Date.au3>
; COM Test file
;
; Excel Automation Example

HotKeySet("{esc}","Sair")
HotKeySet("=","Proximo")
; NOTE: This will open an existing instance of Excel

; So Excel must be started first!!
Global $Proximo
Global $oExcel = _Excel_Open()
Local $oExcel = ObjGet("", "Excel.Application") ; Get an existing Excel Object
Local $linha = 3

If @error Then
	MsgBox($MB_SYSTEMMODAL, "ExcelFileTest", "You don't have Excel running at this moment. Error code: " & Hex(@error, 8),4)
	Exit
EndIf

If IsObj($oExcel) Then MsgBox($MB_SYSTEMMODAL, "", "You successfully attached to the existing Excel Application.",3)


;$oExcel.Visible = 1 ; Let the guy show himself

;$oExcel.workbooks.add ; Add a new workbook

; Example: Fill some cells

;MsgBox($MB_SYSTEMMODAL, "", "Click 'ok' to fill some cells")
;Global $oExcel = _Excel_Open()
Global $oWorkbook = _Excel_BookOpen($oExcel, "C:\Users\Public\Bloco-X-clientes.xlsx")

Local $i
Local $feito = 0
Local $pendencia[6]
With $oWorkbook.activesheet
	For $i = $linha To 200
		 Sleep(1000)
		 $sCellValue = .cells($i, 9).value
		 If $feito == 1 Then
			.cells($i-1, 6).value = @MDAY & "/" & @MON & "/" & @YEAR
		 EndIf
		 $feito = 0
		 If $sCellValue <> "" Then
			;MsgBox(1,$i,$sCellValue)
			$pendencia = ConsultaSite($sCellValue,$i)
		 EndIf
		 ;MsgBox(0,"datas","Ultima Data: " & $pendencia[0] & " - " & $pendencia[1] & @CRLF & " Data Inicio: " & $pendencia[2] & " - " & $pendencia[3] & @CRLF & " Pendencia: " & $pendencia[4] & " - " & $pendencia[5])
		 ;.cells($i, 1).value = $pendencia[0]
		 ;.cells($i, 2).value = $pendencia[1]
		 ;.cells($i, 6).value = $pendencia[2]

	Next

	;MsgBox($MB_SYSTEMMODAL, "", "Click 'ok' to clear the cells")
	;.range("A1:O15").clear

EndWith

Sleep(2000)

Func ConsultaSite($sCellValue,$i)
   Local $dados[6]
   $Proximo = 0
   ;abrir site do SAT
   If $i == $linha Then
	  WinActivate("[CLASS:Chrome_WidgetWin_1]")
   EndIf
   MouseClick ("LEFT",449,353,1,10)
   ;colocar valor, escolhe cliente
   Send($sCellValue)
   Local $iColor = PixelGetColor(594, 413)
   Local $iColor2 = PixelGetColor(321, 415)
   while $iColor <> "0x6A9B53" And $iColor2 <> "0x000000"
	  Sleep(1000)
	  $iColor = PixelGetColor(594, 413)
	  $iColor2 = PixelGetColor(321, 415)
   WEnd
   ;consultar/Buscar
   MouseClick ("LEFT",594,413,1,10)
   If $iColor2 <> "0x000000" Then
	  MouseClick ("LEFT",172,482,1,10)
	  sleep(2000)
	  MouseClick ("LEFT",1352,675,1,10)
	  Sleep(500)

	  ;pegar pendencia de transmissão e data do ultimo envio
	  #comments-start
	  If PixelGetColor(180, 640) == "6986579" Then
		 ;ultima data
		 MouseClickDrag("LEFT",1005,513,1095,513,10)
		 Send("^c")
		 $dados[0] = ClipGet()
		 MouseClickDrag("LEFT",1005,575,1095,575,10)
		 Send("^c")
		 $dados[1] = ClipGet()
		 ;data de obrigatoriedade
		 MouseClickDrag("LEFT",789,513,876,513,10)
		 Send("^c")
		 $dados[2] = ClipGet()
		 MouseClickDrag("LEFT",789,575,876,575,10)
		 Send("^c")
		 $dados[3] = ClipGet()
		 ;ultima data
		 MouseClickDrag("LEFT",876,513,1005,513,10)
		 Send("^c")
		 $dados[4] = ClipGet()
		 MouseClickDrag("LEFT",876,575,1005,575,10)
		 Send("^c")
		 $dados[5] = ClipGet()
	  EndIf
	  #comments-end

	  while $Proximo == 0
	  WEnd

	  MouseClick ("LEFT",1352,155,1,10)
   EndIf
   ;retornar dados
   Return $dados
EndFunc

Func Proximo()
   $Proximo = 1
   $feito = 1
EndFunc

Func Sair()
   MsgBox(0,"fim!","fim!")
   Exit
EndFunc

Exit
