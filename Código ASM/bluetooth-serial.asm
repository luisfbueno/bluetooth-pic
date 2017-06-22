; Luis Felipe Bueno da Silva
; RA - 151020711
; Projeto: TCD de Microcontroladores
; Este programa recebe um byte por Bluetooth e acende os leds desejados de acordo com o valor recebido
#include "p16f873a.inc"

; CONFIG
; __config 0xFF39
 __CONFIG _FOSC_XT & _WDTE_OFF & _PWRTE_OFF & _BOREN_OFF & _LVP_OFF & _CPD_OFF & _WRT_OFF & _CP_OFF

    cblock 0x20 ;Bloco de dados - Vazio
    endc ; Fim do blocos de dados 
    
    org 0 
    goto inicio ; Pula para o inicio do programa
    org 4 ; Rotina de Interrupção
    retfie ; Fim da rotina de interrupção
    
inicio: ; Rotina de início - Definição de valores
    ; Setar TXSTA -> Registrador de TX
    banksel TXSTA ; Seleciona banco do registrador TXSTA
    movlw b'00100110' ; Set w = 00100110
    movwf TXSTA ; Move w para TXSTA  
    ; Setar RCSTA -> Registrador de RX
    banksel RCSTA ; Seleciona banco do registrador RCSTA
    movlw b'10010000' ; Set w = 1000000
    movwf RCSTA ; Move w para RCSTA  
    ; Setar SPBRG -> Valor para obter BPS
    banksel SPBRG ; Seleciona banco do registrador TXSTA
    movlw d'25' ; Set w = 25
    movwf SPBRG ; Move w para TXSTA  
    ; Set TRISB -> Registrador de I/O do port b 
    banksel TRISB ; Seleciona o banco de TRISB
    movlw d'0' ; Set w = 0
    movwf TRISB ; Move w para TRISB
    ; Setar PORTB - Definir valor inicial dos LEDS 
    banksel PORTB ; Seleciona banco do Registrador de TX (Mesmo do de RX)
    movlw d'0' ;Move 0 para W
    movwf PORTB ;Move 0 para PORTB

loopRecebe: ; Loop de recepção do programa
    banksel PIR1 ; Seleciona o banco de PIR1
    btfss PIR1, RCIF; ; Testa Bit de recepção (1 se conexão está disponível)
    goto loopRecebe ; Se 0,volta para o loop
    banksel RCREG ; Seleciona o banco do RCREG
    movf RCREG,W ; Move o conteúdo do Registrado de RX para W
    banksel PORTB ;Seleciona banco do PORTB
    movwf PORTB ; Move w para PORTB para receber os Leds
    goto loopRecebe ; Volta para o loop
    
    END ; Fim do programa
